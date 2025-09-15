/**
 * Markdown Parser Module
 * Converts markdown to HTML with support for Obsidian-style features
 */

class MarkdownParser {
    constructor() {
        // Regex patterns for markdown elements
        this.patterns = {
            // Headers
            h1: /^# (.+)$/gm,
            h2: /^## (.+)$/gm,
            h3: /^### (.+)$/gm,
            h4: /^#### (.+)$/gm,
            h5: /^##### (.+)$/gm,
            h6: /^###### (.+)$/gm,
            
            // Text formatting
            bold: /\*\*([^*]+)\*\*/g,
            italic: /\*([^*]+)\*/g,
            boldItalic: /\*\*\*([^*]+)\*\*\*/g,
            strikethrough: /~~([^~]+)~~/g,
            code: /`([^`]+)`/g,
            
            // Links and images
            link: /\[([^\]]+)\]\(([^)]+)\)/g,
            image: /!\[([^\]]*)\]\(([^)]+)\)/g,
            obsidianImage: /!\[\[([^\]]+)\]\]/g,
            
            // Lists
            unorderedList: /^[-*+] (.+)$/gm,
            orderedList: /^\d+\. (.+)$/gm,
            
            // Blockquote
            blockquote: /^> (.+)$/gm,
            
            // Horizontal rule
            horizontalRule: /^(-{3,}|_{3,}|\*{3,})$/gm,
            
            // Code blocks
            codeBlock: /```(\w*)\n([\s\S]*?)```/g,
            
            // Tables
            tableRow: /^\|(.+)\|$/gm,
            tableSeparator: /^\|[-: ]+\|$/gm,
            
            // Line breaks
            lineBreak: /  $/gm,
            paragraph: /\n\n/g
        };
        
        // Section markers
        this.sectionMarkers = {
            reszletes: /^#+ (Részletes|Detailed|Anatómia|Klinika)/i,
            osszefoglalas: /^#+ (Összefoglalás|Summary|Rövid)/i,
            kepek: /^#+ (Képek|Images|Ábrák|Diagramok|Diagrams)/i
        };
    }
    
    /**
     * Parse markdown to HTML
     * @param {string} markdown - The markdown content
     * @returns {Object} - { html: string, sections: Object, toc: Array }
     */
    parseMarkdown(markdown) {
        if (!markdown || typeof markdown !== 'string') {
            throw new ParseError('Invalid markdown input');
        }
        
        try {
            // Extract sections first
            const sections = this.extractSections(markdown);
            
            // Parse each section separately
            const parsedSections = {};
            for (const [key, content] of Object.entries(sections)) {
                parsedSections[key] = this.convertToHTML(content);
            }
            
            // Generate TOC from the detailed section (or full content if no sections)
            const tocContent = sections.reszletes || markdown;
            const toc = this.generateTOC(tocContent);
            
            // Generate full HTML (for backward compatibility)
            const html = this.convertToHTML(markdown);
            
            return {
                html,
                sections: parsedSections,
                toc
            };
        } catch (error) {
            if (error instanceof ParseError) {
                throw error;
            }
            throw new ParseError('Failed to parse markdown', null, markdown);
        }
    }
    
    /**
     * Extract sections from markdown
     * @private
     */
    extractSections(markdown) {
        const sections = {
            reszletes: '',
            osszefoglalas: '',
            kepek: ''
        };
        
        const lines = markdown.split('\n');
        let currentSection = 'reszletes'; // Default section
        let sectionContent = [];
        
        for (const line of lines) {
            let sectionFound = false;
            
            // Check if this line marks a new section
            for (const [type, pattern] of Object.entries(this.sectionMarkers)) {
                if (pattern.test(line)) {
                    // Save previous section content
                    if (sectionContent.length > 0) {
                        sections[currentSection] = sectionContent.join('\n').trim();
                    }
                    
                    // Start new section
                    currentSection = type;
                    sectionContent = [line]; // Include the header
                    sectionFound = true;
                    break;
                }
            }
            
            if (!sectionFound) {
                sectionContent.push(line);
            }
        }
        
        // Save last section
        if (sectionContent.length > 0) {
            sections[currentSection] = sectionContent.join('\n').trim();
        }
        
        // If no sections were found, put everything in részletes
        if (!sections.reszletes && !sections.osszefoglalas && !sections.kepek) {
            sections.reszletes = markdown;
        }
        
        return sections;
    }
    
    /**
     * Convert markdown to HTML
     * @private
     */
    convertToHTML(markdown) {
        let html = markdown;
        
        // Preserve code blocks
        const codeBlocks = [];
        html = html.replace(this.patterns.codeBlock, (match, lang, code) => {
            const placeholder = `___CODEBLOCK_${codeBlocks.length}___`;
            codeBlocks.push({ lang, code });
            return placeholder;
        });
        
        // Preserve inline code
        const inlineCodes = [];
        html = html.replace(this.patterns.code, (match, code) => {
            const placeholder = `___INLINECODE_${inlineCodes.length}___`;
            inlineCodes.push(code);
            return placeholder;
        });
        
        // Convert headers
        html = html.replace(this.patterns.h6, '<h6>$1</h6>');
        html = html.replace(this.patterns.h5, '<h5>$1</h5>');
        html = html.replace(this.patterns.h4, '<h4>$1</h4>');
        html = html.replace(this.patterns.h3, '<h3>$1</h3>');
        html = html.replace(this.patterns.h2, '<h2>$1</h2>');
        html = html.replace(this.patterns.h1, '<h1>$1</h1>');
        
        // Convert text formatting (order matters!)
        html = html.replace(this.patterns.boldItalic, '<strong><em>$1</em></strong>');
        html = html.replace(this.patterns.bold, '<strong>$1</strong>');
        html = html.replace(this.patterns.italic, '<em>$1</em>');
        html = html.replace(this.patterns.strikethrough, '<del>$1</del>');
        
        // Convert links and images
        html = html.replace(this.patterns.image, '<img src="$2" alt="$1" />');
        html = html.replace(this.patterns.obsidianImage, (match, filename) => {
            // Convert Obsidian-style image links
            const imagePath = `content/neuroanat/images/${filename}`;
            return `<img src="${imagePath}" alt="${filename}" />`;
        });
        html = html.replace(this.patterns.link, '<a href="$2">$1</a>');
        
        // Convert lists
        html = this.convertLists(html);
        
        // Convert blockquotes
        html = html.replace(this.patterns.blockquote, '<blockquote>$1</blockquote>');
        
        // Convert horizontal rules
        html = html.replace(this.patterns.horizontalRule, '<hr />');
        
        // Convert tables
        html = this.convertTables(html);
        
        // Restore code blocks
        codeBlocks.forEach((block, index) => {
            const langClass = block.lang ? ` class="language-${block.lang}"` : '';
            const replacement = `<pre><code${langClass}>${this.escapeHtml(block.code)}</code></pre>`;
            html = html.replace(`___CODEBLOCK_${index}___`, replacement);
        });
        
        // Restore inline code
        inlineCodes.forEach((code, index) => {
            const replacement = `<code>${this.escapeHtml(code)}</code>`;
            html = html.replace(`___INLINECODE_${index}___`, replacement);
        });
        
        // Convert line breaks
        html = html.replace(this.patterns.lineBreak, '<br />');
        
        // Convert paragraphs
        html = this.convertParagraphs(html);
        
        return html;
    }
    
    /**
     * Convert lists to HTML
     * @private
     */
    convertLists(html) {
        const lines = html.split('\n');
        const result = [];
        let inList = false;
        let listType = null;
        let listItems = [];
        
        for (const line of lines) {
            const unorderedMatch = line.match(/^[-*+] (.+)$/);
            const orderedMatch = line.match(/^\d+\. (.+)$/);
            
            if (unorderedMatch || orderedMatch) {
                const item = unorderedMatch ? unorderedMatch[1] : orderedMatch[1];
                const currentType = unorderedMatch ? 'ul' : 'ol';
                
                if (!inList || listType !== currentType) {
                    // Close previous list if any
                    if (inList) {
                        result.push(this.createList(listType, listItems));
                        listItems = [];
                    }
                    inList = true;
                    listType = currentType;
                }
                
                listItems.push(item);
            } else {
                // Not a list item
                if (inList) {
                    result.push(this.createList(listType, listItems));
                    inList = false;
                    listItems = [];
                    listType = null;
                }
                result.push(line);
            }
        }
        
        // Close any remaining list
        if (inList) {
            result.push(this.createList(listType, listItems));
        }
        
        return result.join('\n');
    }
    
    /**
     * Create HTML list
     * @private
     */
    createList(type, items) {
        const listItems = items.map(item => `<li>${item}</li>`).join('\n');
        return `<${type}>\n${listItems}\n</${type}>`;
    }
    
    /**
     * Convert tables to HTML
     * @private
     */
    convertTables(html) {
        const lines = html.split('\n');
        const result = [];
        let inTable = false;
        let tableRows = [];
        let headerRow = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isTableRow = /^\|(.+)\|$/.test(line);
            const isTableSeparator = /^\|[-: ]+\|$/.test(line);
            
            if (isTableRow && !isTableSeparator) {
                if (!inTable) {
                    inTable = true;
                    headerRow = line;
                } else {
                    tableRows.push(line);
                }
            } else if (isTableSeparator && inTable && headerRow) {
                // Skip separator, we already have the header
            } else {
                // Not a table row
                if (inTable && headerRow) {
                    result.push(this.createTable(headerRow, tableRows));
                    inTable = false;
                    tableRows = [];
                    headerRow = null;
                }
                result.push(line);
            }
        }
        
        // Close any remaining table
        if (inTable && headerRow) {
            result.push(this.createTable(headerRow, tableRows));
        }
        
        return result.join('\n');
    }
    
    /**
     * Create HTML table
     * @private
     */
    createTable(headerRow, bodyRows) {
        const parseRow = (row) => {
            return row.split('|')
                .slice(1, -1) // Remove empty first and last elements
                .map(cell => cell.trim());
        };
        
        const headers = parseRow(headerRow);
        const headerHtml = headers.map(h => `<th>${h}</th>`).join('');
        
        const bodyHtml = bodyRows.map(row => {
            const cells = parseRow(row);
            const cellsHtml = cells.map(c => `<td>${c}</td>`).join('');
            return `<tr>${cellsHtml}</tr>`;
        }).join('\n');
        
        return `<table>
<thead>
<tr>${headerHtml}</tr>
</thead>
<tbody>
${bodyHtml}
</tbody>
</table>`;
    }
    
    /**
     * Convert paragraphs
     * @private
     */
    convertParagraphs(html) {
        const blocks = html.split('\n\n');
        
        return blocks.map(block => {
            block = block.trim();
            if (!block) return '';
            
            // Don't wrap if already wrapped in block element
            if (block.match(/^<(h[1-6]|p|ul|ol|blockquote|pre|table|hr)/)) {
                return block;
            }
            
            return `<p>${block}</p>`;
        }).join('\n\n');
    }
    
    /**
     * Generate table of contents
     * @private
     */
    generateTOC(markdown) {
        const toc = [];
        const headerRegex = /^(#{1,6}) (.+)$/gm;
        let match;
        let idCounter = 0;
        
        while ((match = headerRegex.exec(markdown)) !== null) {
            const level = match[1].length;
            const text = match[2];
            const id = `toc-${++idCounter}`;
            
            toc.push({
                id,
                text,
                level
            });
        }
        
        return this.buildTOCTree(toc);
    }
    
    /**
     * Build hierarchical TOC tree
     * @private
     */
    buildTOCTree(flatToc) {
        const tree = [];
        const stack = [];
        
        for (const item of flatToc) {
            const tocItem = new TocItem({
                id: item.id,
                text: item.text,
                level: item.level
            });
            
            // Find parent
            while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
                stack.pop();
            }
            
            if (stack.length === 0) {
                tree.push(tocItem);
            } else {
                stack[stack.length - 1].addChild(tocItem);
            }
            
            stack.push(tocItem);
        }
        
        return tree;
    }
    
    /**
     * Escape HTML special characters
     * @private
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    /**
     * Parse sections separately
     */
    parseSections(markdown) {
        const sections = this.extractSections(markdown);
        const result = {};
        
        for (const [type, content] of Object.entries(sections)) {
            if (content) {
                result[type] = Section.fromMarkdown(
                    type,
                    this.getSectionTitle(type),
                    content,
                    this.convertToHTML(content)
                );
            } else {
                result[type] = Section.empty(type, this.getSectionTitle(type));
            }
        }
        
        return result;
    }
    
    /**
     * Get section title
     * @private
     */
    getSectionTitle(type) {
        const titles = {
            reszletes: 'Részletes',
            osszefoglalas: 'Összefoglalás',
            kepek: 'Képek'
        };
        return titles[type] || type;
    }
}

// Create singleton instance
const markdownParser = new MarkdownParser();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarkdownParser, markdownParser };
}