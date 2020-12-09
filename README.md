# Kompect - The Image Compressor

## What is Kompect?

Kompect is a simple image compression tool which uses [Imagemin](https://github.com/imagemin/imagemin) under the hood.

## Support

Lossy Compression is done by default. Lossless support is under development.

Supported Image Extension
- JPEG
- PNG
- WEBP

## Development

Kompect is developed using Vue, Electron and Vuetify. To install and work on Kompect locally:

Clone the repository to local

```bash
cd kompect
npm install
```

To build the project, and all the other modules included in the package:

```bash
npm run build
```

To run the application, use the below command. It will spawn an electron instance:

```bash
npm run serve
```

## License

[MIT](LICENSE)