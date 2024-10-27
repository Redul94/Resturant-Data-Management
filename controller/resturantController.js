const resturantSchema = require("../models/resturantSchema");

//Create Resturant
const resturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords)
      return res.status(500).send("Plase fill up title and address");
    const newResturant = new resturantSchema({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(200).send("New resturant data added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error ");
  }
};

const getResturantData = async (req,res)=>{
  try {
    const restuData = await resturantSchema.find({});
    if(!restuData) res.status(400).send('No data founded');
    res.status(200).send({
        success:true,
        totalcounts:restuData.length,
        restuData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error in getting resturant api');
    
  }
}
module.exports = {resturantController,getResturantData};
