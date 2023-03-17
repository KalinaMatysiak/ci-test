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
      run: |
        docker=$(git --no-pager log -1 --format=format:%H -- src/fake/)
        expect=current


        EXPECTED_SHA=$expect DOCKER_IMAGE_SHA=$docker node test.js
