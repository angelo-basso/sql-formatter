import dedent from 'dedent-js';
import { FormatFn } from '../../src/sqlFormatter.js';

export default function supportsQuotedIdentifier(format: FormatFn) {
  it('should preserve identifiers has they are', () => {
    const result = format('SELECT col1, "col2", "col3" FROM "table1" AS table2;');
    expect(result).toBe(dedent`
      SELECT
        col1,
        "col2",
        "col3"
      FROM
        "table1" AS table2;`);
  });

  /*   it('should quote identifiers with double quotes', () => {
    const result = format('SELECT col1, "col2", `col3` FROM "table1" AS `table2`;', {
      identifierQuotation: 'quoted',
      quotationCharacter: '"',
    });
    expect(result).toBe(dedent`
      SELECT
        "col1",
        "col2",
        "col3"
      FROM
        "table1" AS "table2";`);
  });

  it('should quote identifiers with backticks', () => {
    const result = format('SELECT col1, "col2", `col3` FROM "table1" AS `table2`;', {
      identifierQuotation: 'quoted',
      quotationCharacter: '`',
    });
    expect(result).toBe(dedent`
      SELECT \`col1\`,
             \`col2\`,
             \`col3\`
      FROM \`table1\` AS \`table2\`;`);
  }); */

  it('should remove quote from identifiers', () => {
    const result = format('SELECT col1, "col2", "col3" FROM "table1" AS "table2";', {
      identifierQuotation: 'unquoted',
    });
    expect(result).toBe(dedent`
      SELECT col1,
             col2,
             col3
      FROM table1 AS table2;`);
  });
}
