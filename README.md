# Yugipedia server tasks

Set of tasks to be run on the server. Each task is an npm workspace.

Besides the tasks, there are individual reusable libraries in the [libs](/libs/) folder.

## Available tasks

* [Gizmek Uka targets update](/tasks/gizmek-uka-targets-update/)
* [TCGplayer token update](/tasks/tcg-player-token-update/)

## Usage

### Configuration

Each task has its own documentation on how to configure.

### Executing a task

To run a task, execute the `npm start` command in the context of the task
workspace, using the path to the worksapce `npm start -w ./tasks/test-task`
or the workspace package name `npm start -w test-task`.

Logs for each execution will be added to a `logs` folder inside each task root.

### Linting

Run `npm run lint` to lint the code. Performs type checking with `tsc`
and lints the code via `eslint`.

Alternatively, each stage can be run separately: `npm run lint:types` and
`npm run lint:code`, respectively.

Run `npm run lint:fix` to fix linting errors that can be fixed automatically for the code.

### Testing

Run `npm run test` (or `npm t`) to run all tests. It takes a test path pattern as an optional argument.

Run `npm run test:watch` to enter watch mode. It takes a test path pattern as an optional argument.

Run `npm run test:coverage` to run all tests and generate coverage reports.

### File cleaning

Run `clean:coverage` to remove the the test coverage files (`coverage` folder at the project root).

Run `clean:deps` to remove project dependencies (`node_modules` folder).

Run `clean:dist` to remove transpiled files (`dist` folder).

Run `clean:logs` to remove the collected logs (`logs` folder at each task root).

### Other commands

Run `npm run todo` to track `TODO` comments.
