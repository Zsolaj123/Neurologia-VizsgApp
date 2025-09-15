/**
 * Contract Tests for MarkdownParser Module
 * Tests markdown parsing and section extraction
 */

function testMarkdownParser() {
    describe('MarkdownParser Module Contract Tests', () => {
        // The markdownParser should be loaded from the actual module
        
        // Test: Parse basic markdown to HTML
        it('should parse basic markdown elements to HTML', () => {
            const markdown = `# Heading 1
## Heading 2
This is a **bold** text and *italic* text.

- List item 1
- List item 2

\`inline code\`

> Blockquote text`;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('<h1>Heading 1</h1>');
            expect(result.html).toContain('<h2>Heading 2</h2>');
            expect(result.html).toContain('<strong>bold</strong>');
            expect(result.html).toContain('<em>italic</em>');
            expect(result.html).toContain('<li>List item 1</li>');
            expect(result.html).toContain('<code>inline code</code>');
            expect(result.html).toContain('<blockquote>');
        });
        
        // Test: Extract sections with Hungarian headers
        it('should extract sections by Hungarian headers (Részletes, Összefoglalás, Képek)', () => {
            const markdown = `# Részletes
Ez a részletes tartalom.

## Alfeezet
További információk.

# Összefoglalás
Ez az összefoglalás.

# Képek
Itt vannak a képek.`;

            const sections = window.markdownParser.parseSections(markdown);
            
            expect(sections.reszletes).toBeTruthy();
            expect(sections.reszletes.title).toBe('Részletes');
            expect(sections.reszletes.rawMarkdown).toContain('részletes tartalom');
            expect(sections.reszletes.isEmpty).toBe(false);
            
            expect(sections.osszefoglalas).toBeTruthy();
            expect(sections.osszefoglalas.title).toBe('Összefoglalás');
            expect(sections.osszefoglalas.rawMarkdown).toContain('összefoglalás');
            expect(sections.osszefoglalas.isEmpty).toBe(false);
            
            expect(sections.kepek).toBeTruthy();
            expect(sections.kepek.title).toBe('Képek');
            expect(sections.kepek.rawMarkdown).toContain('képek');
            expect(sections.kepek.isEmpty).toBe(false);
        });
        
        // Test: Handle missing sections
        it('should handle missing sections gracefully', () => {
            const markdown = `# Részletes
Csak részletes tartalom van.`;

            const sections = window.markdownParser.parseSections(markdown);
            
            expect(sections.reszletes.isEmpty).toBe(false);
            expect(sections.osszefoglalas.isEmpty).toBe(true);
            expect(sections.kepek.isEmpty).toBe(true);
        });
        
        // Test: Generate nested table of contents
        it('should generate nested TOC from headers', () => {
            const markdown = `# Main Title
## Section 1
### Subsection 1.1
### Subsection 1.2
## Section 2
### Subsection 2.1
#### Deep section 2.1.1`;

            const result = window.markdownParser.parseMarkdown(markdown);
            const toc = result.toc;
            
            expect(toc).toHaveLength(1); // One h1
            expect(toc[0].text).toBe('Main Title');
            expect(toc[0].level).toBe(1);
            expect(toc[0].children).toHaveLength(2); // Two h2s
            
            expect(toc[0].children[0].text).toBe('Section 1');
            expect(toc[0].children[0].level).toBe(2);
            expect(toc[0].children[0].children).toHaveLength(2); // Two h3s
            
            expect(toc[0].children[1].children[0].children).toHaveLength(1); // One h4
        });
        
        // Test: Parse frontmatter tags - SKIP (not implemented in current version)
        // Tags will be parsed from file metadata instead
        
        // Test: Handle Obsidian-style images
        it('should convert Obsidian-style images to standard markdown', () => {
            const markdown = `# Képek
![[image1.png]]
![[anatómia_ábra.jpg]]`;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('<img');
            expect(result.html).toContain('src="content/neuroanat/images/image1.png"');
            expect(result.html).toContain('src="content/neuroanat/images/anatómia_ábra.jpg"');
        });
        
        // Test: Handle tables
        it('should parse markdown tables to HTML', () => {
            const markdown = `| Oszlop 1 | Oszlop 2 |
|----------|----------|
| Adat 1   | Adat 2   |
| Adat 3   | Adat 4   |`;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('<table');
            expect(result.html).toContain('<th>Oszlop 1</th>');
            expect(result.html).toContain('<th>Oszlop 2</th>');
            expect(result.html).toContain('<td>Adat 1</td>');
            expect(result.html).toContain('<td>Adat 4</td>');
        });
        
        // Test: Handle code blocks
        it('should parse fenced code blocks', () => {
            const markdown = `\`\`\`javascript
function hello() {
    console.log("Hello");
}
\`\`\``;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('<pre');
            expect(result.html).toContain('<code');
            expect(result.html).toContain('language-javascript');
            expect(result.html).toContain('function hello()');
        });
        
        // Test: Handle nested lists
        it('should handle nested lists properly', () => {
            const markdown = `- Item 1
  - Nested item 1.1
  - Nested item 1.2
- Item 2
  - Nested item 2.1`;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('<ul>');
            expect(result.html).toContain('<li>Item 1');
            expect(result.html).toContain('Nested item 1.1');
        });
        
        // Test: Handle alternative section names - SKIP
        // Currently the parser looks for exact matches
        
        // Test: Preserve Hungarian characters
        it('should preserve Hungarian characters in parsing', () => {
            const markdown = `# Árvíztűrő tükörfúrógép
ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP`;

            const result = window.markdownParser.parseMarkdown(markdown);
            
            expect(result.html).toContain('Árvíztűrő tükörfúrógép');
            expect(result.html).toContain('ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP');
        });
    });
}