'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    sequelize : {
        enable:true,
        package:"egg-sequelize"
    },

    cors : {
        enable:true,
        package:"egg-cors"
    },

    oss :{
        enable:true,
        package:"egg-oss"
    },

    io:{
        enable:true,
        package:"egg-socket.io"
    }
};
