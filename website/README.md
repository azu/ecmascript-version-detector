# Design

## Navigation history

### At First time

1. If has not `?text={query}`, return
2. fill with `{query}` and analyzed

In other word,

1. Separate save data and change url.

### Typing

1. Analyze `{query}` and output result
1. Set `{query}` to navigation `?text={query}`