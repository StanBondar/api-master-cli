This package will help you to generate an express router TypeScript bundle in a single moment.
It can be started only from the project directory or from any of its subdirectories.
The package will create a router bundle in your API folder and will update the API entry point.
If the API folder doesn't exist - it will be created automatically.

#### Usage

Just run npx api-master-cli <route_name>, where "route_name" is your desired route name. All methods will be generated by default. Pluralize package handles all route names for better naming. You can use flag -s **in the end** to force singular route naming.

You can choose only methods you want to generate by typing its names separated by dash(-).

I.e. npx api-master-cli <route_name> get-put. In this case only get and put methods will be generated. If you made a mistage in method name - it will be skipped. If all methods will be provided with mistakes, the default methods bundle will be created.
