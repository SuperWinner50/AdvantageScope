# Exporting Log Data

_[< Return to homepage](/docs/INDEX.md)_

AdvantageScope includes a flexible system for exporting log data as a CSV or WPILOG file. The export functions work when viewing a log file or when connected to a live data source. Possible use cases include:

- Converting a WPILOG file to CSV for analysis in other application.
- Exporting a WPILOG file based on NetworkTables data, for later access.

To view options for exporting, click "File" > "Export Data..." or press **cmd/ctrl + E**.

![Export options](/docs/resources/export/export-1.png)

The following options are provided when exporting:

- **Format:** Sets the general format of the exported file. See options below.
  - _CSV (Table):_ Comma separated values, where each row represents a distinct timestamp and each column represents a field (plus a column for the timestamp value). Each row can represent a change in multiple fields.
  - _CSV (List):_ Comma separated values, where each row represents a change in a single field with columns for timestamp, key, and value.
  - _WPILOG:_ Standard WPILOG file that can be opened in AdvantageScope, Sapphire, etc.
- **Timestamps:** Only for "CSV (Table)". Sets the method for creating new rows. See options below.
  - _All Changes:_ Create a new row when any of the included fields are updated. Other columns will show duplicate values.
  - _Fixed:_ Create new rows at a fixed interval, useful for logs without timestamp synchronization (when many fields are being logged with similar, but not identical, timestamps).
- **Period:** Only for "CSV (Table)" with fixed timestamps. Sets the period in milliseconds between each row. Typically, this should match the loop cycle period of the robot code.

> Note: Exported log files may not match the original data exactly. The following changes are made:
>
> - Duplicate values recorded in the original log file are discarded, and are not included in formats like "CSV (List)".
> - When exporting as "WPILOG", all numeric fields are saved using the "double" or "double[]" types.

An example CSV file exported from AdvantageScope is shown below, in the "CSV (Table)" format with timestamps set to "All Changes":

![CSV table](/docs/resources/export/export-2.png)