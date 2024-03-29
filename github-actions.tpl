name: Development - CI
on:
  push:

jobs: 
  what_changed_images:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    - name: changed_files
      run: EXPECTED_SHA=$EXPECTED_SHA DOCKER_IMAGE_SHA=$(git --no-pager log -1 --format=format:%h -- src/fake/) node test.js
