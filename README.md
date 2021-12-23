Build docker container: `docker build -t gci-helper .`

Run container: `docker run --name "container-name" -e EXPORT_DATA_ENDPOINT="http://path.to.data/" -p 3000:3000 gci-helper`

Optional environment variables:

* `CUSTOM_TITLE`: Page title (will be set after data is loaded)
* `EXPORT_DATA_SUBKEY`: A sub-key in the JSON returned by the endpoint where the data resides (otherwise, assumes the data lives in the root of the object)
* `EXPORT_DATA_PATH`: Overrides data endpoint, making the application fetch data from a path in the filesystem instead
