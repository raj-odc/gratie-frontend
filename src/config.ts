// the first line has to be used when pushing
// if production is set to true devnet is used!

// this line automatically detects if yarn build && yarn start is used!
export const PRODUCTION = process.env.NODE_ENV === 'production';

// for development purposes to use production in yarn dev
// export const PRODUCTION = true;