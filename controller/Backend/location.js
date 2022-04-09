const locationS = require('../../models/location.schema');

const loc = async(req, res)=>{
    const vendor_id = req.body.vendor_store 
    try{
        const d = await locationS.find(vendor_id)
        locationS.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [req.body.lon, req.body.lat] },
                    distanceField: "dist.calculated",
                    // maxDistance: 10000,
                    query: { "isEnabled": true }
                }
            }
        ])
        .then((data)=>{
            console.log(data);
            res.send('user/home',{
              vendor_list:data
            });
        }).catch((err)=>{
            console.log(err, 'wrong');
            res.send(err);
        })
    }
    catch(err){
        console.log(err)
        res.send(err);
    }
}


// locationS.statics.getNearby = function (longitude, latitude, minDistance, maxDistance, callback) {

//     if ((longitude || latitude) === undefined) return new ModelError("location or radius is missing");
    
//     var Places = this;
//     var point = { type: "Point", coordinates: [ longitude, latitude]};
//     Places.geoNear(point, { minDistance: parseFloat(minDistance), maxDistance : maxDistance},
//         function(err, activities, stats) {
//             if (err)  return callback(err);
//             callback(null, activities);
//     });


module.exports = {loc};