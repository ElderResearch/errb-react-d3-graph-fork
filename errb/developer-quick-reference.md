# Developer Quick Reference

One-liner for doing a transpile and quick copy into active Riskbox `yarn build-hot` session:

```
if npm run dist:transpile; rsync -a --delete lib/ ../riskbox-upstream-pull/node_modules/@elderresearch/errb-react-d3-graph/lib/; end
```

One-liner for the original library's sandbox environment:

```
if npm run dist:sandbox; npm run start; end;
```
