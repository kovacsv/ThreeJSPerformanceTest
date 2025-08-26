import esbuildServe from 'esbuild-serve';

esbuildServe (
    {
        entryPoints: ['source/main.js'],
        bundle: true,
        minify: true,
        outfile: 'public/build/main.js',
        logLevel: 'silent'
    },
    {
        root: 'public'
    }
);
