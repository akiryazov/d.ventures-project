import webpack from 'webpack';
import config from '../webpack.config.prod';

webpack(config).run((error, stats) => {
    if (error) {
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.errors && jsonStats.errors.length > 0) {
        throw new SyntaxError("App NOT ready!");
    }
    return 0;
});
