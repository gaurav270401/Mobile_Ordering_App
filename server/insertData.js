import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const username=process.env.DB_Username;
const password=process.env.DB_Password;

const uri = `mongodb+srv://${username}:${password}@crud-app.uqoyrsf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mobileSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  processor: String,
  memory: String,
  os: String,
  image: String,
});

const Mobile = mongoose.model('Mobile', mobileSchema);
const mobilesData = [
  
  {
    "name": "Samsung Galaxy S21",
    "price": 69999,
    "type": "Smartphone",
    "processor": "Exynos 2100",
    "memory": "128GB",
    "os": "Android 11",
    "image": "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/8131pwAojZL._AC_UF894,1000_QL80_.jpg"
  },
  {
    "name": "iPhone 12",
    "price": 79999,
    "type": "Smartphone",
    "processor": "A14 Bionic",
    "memory": "256GB",
    "os": "iOS 14",
    "image": "https://m.economictimes.com/thumb/msid-86805878,width-1200,height-1200,resizemode-4,imgsize-53752/apple-iphone-12.jpg"
  },
  {
    "name": "Google Pixel 5",
    "price": 59999,
    "type": "Smartphone",
    "processor": "Snapdragon 765G",
    "memory": "128GB",
    "os": "Android 11",
    "image": "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81-fNmQqlLL.jpg"
  },
  {
    "name": "OnePlus 8T",
    "price": 42999,
    "type": "Smartphone",
    "processor": "Snapdragon 865",
    "memory": "128GB",
    "os": "OxygenOS 11",
    "image": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-8t-1.jpg"
  },
  {
    "name": "Xiaomi Mi 10",
    "price": 44999,
    "type": "Smartphone",
    "processor": "Snapdragon 865",
    "memory": "256GB",
    "os": "MIUI 12",
    "image": "https://www.notebookcheck.net/fileadmin/Notebooks/Xiaomi/Mi_10/Xiaomi_Mi_10_4zu3.jpg"
  },
  {
    "name": "Huawei P40",
    "price": 59999,
    "type": "Smartphone",
    "processor": "Kirin 990",
    "memory": "128GB",
    "os": "EMUI 10.1",
    "image": "https://www.dxomark.com/wp-content/uploads/medias/post-43415/HUAWEI_P40_Pro_Silver_front.jpg"
  },
  {
    "name": "Sony Xperia 1 II",
    "price": 84999,
    "type": "Smartphone",
    "processor": "Snapdragon 865",
    "memory": "256GB",
    "os": "Android 10",
    "image": "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-z-ofic-1.jpg"
  },
  {
    "name": "Motorola Edge+",
    "price": 64999,
    "type": "Smartphone",
    "processor": "Snapdragon 865",
    "memory": "256GB",
    "os": "Android 10",
    "image": "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-plus-2.jpg"
  },
  {
    "name": "Nokia 8.3 5G",
    "price": 49999,
    "type": "Smartphone",
    "processor": "Snapdragon 765G",
    "memory": "128GB",
    "os": "Android 10",
    "image": "https://www.tradeinn.com/f/13790/137905231/nokia-8.3-5g-8gb-128gb-6.8.jpg"
  },
  {
    "name": "LG Velvet",
    "price": 36999,
    "type": "Smartphone",
    "processor": "Snapdragon 765G",
    "memory": "128GB",
    "os": "Android 10",
    "image": "https://fdn2.gsmarena.com/vv/pics/lg/lg-velvet-4g-1.jpg"
  },
  {
    "name": "Oppo Find X3 Pro",
    "price": 74999,
    "type": "Smartphone",
    "processor": "Snapdragon 888",
    "memory": "256GB",
    "os": "ColorOS 11.2",
    "image": "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x3-pro-1.jpg"
  },
  {
    "name": "Vivo X60 Pro",
    "price": 54999,
    "type": "Smartphone",
    "processor": "Exynos 1080",
    "memory": "256GB",
    "os": "Funtouch OS 11.1",
    "image": "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81DJgF3G9iL.jpg"
  },
  {
    "name": "Realme 8 Pro",
    "price": 17999,
    "type": "Smartphone",
    "processor": "Snapdragon 720G",
    "memory": "128GB",
    "os": "Realme UI 2.0",
    "image": "https://fdn2.gsmarena.com/vv/pics/realme/realme-8-pro-1.jpg"
  },
  {
    "name": "Infinix Note 10 Pro",
    "price": 16999,
    "type": "Smartphone",
    "processor": "MediaTek Helio G95",
    "memory": "128GB",
    "os": "XOS 7.6",
    "image": "https://images.fonearena.com/blog/wp-content/uploads/2021/05/Infinix-Note-10-Pro.jpg"
  },
  {
    "name": "Poco X3 Pro",
    "price": 18999,
    "type": "Smartphone",
    "processor": "Snapdragon 860",
    "memory": "128GB",
    "os": "MIUI 12",
    "image": "https://www.notebookcheck.net/typo3temp/_processed_/f/b/csm_4_zu_3_Teaser_neu_8f394e99a8.jpg"
  }


];

async function insertData() {

const result = await Mobile.insertMany(mobilesData);
console.log(`${result.length} documents were inserted`);

}

insertData().catch(console.error);