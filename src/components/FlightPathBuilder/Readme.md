Flight path builder example:

```js
const dates = [
  new Date(1982, 1, 1),
  new Date(1987, 1, 1),
  new Date(1993, 1, 1),
  new Date(1997, 1, 1),
  new Date(2001, 1, 1),
  new Date(2005, 1, 1),
  new Date(2011, 1, 1),
  new Date(2015, 1, 1)
];

const assets = [
  123456789,
  145636789,
  134536789,
  123536789,
  112336789,
  134536789,
  145636789,
  155536789
];

const liabilities = [
  223456789,
  195636789,
  184536789,
  173536789,
  162336789,
  154536789,
  145636789,
  135536789
];

const liabilityCashflows = [
  2234567,
  2356367,
  2545367,
  2335367,
  2023367,
  1745367,
  1356367,
  1055367
];

<FlightPathBuilder
  dates={dates}
  assets={assets}
  liabilities={liabilities}
  liabilityCashflows={liabilityCashflows}
/>;
```
