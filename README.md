Build docker container: `docker build -t gci-helper .`

Run container: `docker run --name "container-name" -e EXPORT_DATA_ENDPOINT="http://path.to.data/" -p 3000:3000 gci-helper`

Optional container environment variables:

* `CUSTOM_TITLE`: Page title (will be set after data is loaded)
