# Release Process

System pre-req:

```
yarn global add npm-run-all
```

From clean checkout:

```
npm install
```

Then:

```
# first terminal window
npm run dist:sandbox
npm run start

# second terminal window
npm run dist
# if the tests all pass and it works, great, skip the next part

# if the tests that failed look like they failed for a good reason based on what we did for our purposes and we want to keep the release going skipping the tests, then
npm-run-all --parallel dist:\*
```

Packaging for local use:

```
npm pack

# from riskbox directory
yarn add /Users/wproffitt/Code/metabase-land/errb-react-d3-graph/elderresearch-errb-react-d3-graph-2.4.2.tgz

# though this seems to bring in some transitive dependencies we might not need like is-core-module, get-intrinsic, call-bind, @babel/types, @babel/helper-validator-identifier, @babel/helper-skip-transparent-expression-wrappers
```

Publishing to JFrog Artifactory:

```
# requires having set up the npm @elderresearch scope;
# JFrog has instructions on this in the "Set Me Up" section
npm publish

```

Bonus: beginning to figure out how to do something like snapshot versions:

```
yarn global add semver

# this command will produce the output 2.4.2-snapshot.0, and running it again against 2.4.2-snapshot.0 will produce 2.4.2-snapshot.1
# https://docs.npmjs.com/cli/v6/using-npm/semver
semver -i prerelease --preid snapshot 2.4.1
```
