import './Shop.css';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect, Fragment } from "react";
import { TbBasketPlus } from "react-icons/tb";
import Footer from './Footer';
import { notification } from 'antd';
import { LuSearchCode } from "react-icons/lu";
import HP from '../img/hp.png';
import MI from '../img/mi.png';
import Logo from '../img/logo1.png';


function Blog({ count, setCount }) {

    const [blog, setBlog] = useState([]);
    const [search, setSearch] = useState("");

    let data = collection(db, 'user');
    useEffect(() => {

        onSnapshot(
            data, (snapshot) => {
                let malumot = [];

                snapshot.docs.forEach((doc) => {
                    malumot.push({ ...doc.data(), id: doc.id })
                });
                setBlog(malumot);
            }
        );
    }, []);

    const handleCart = (dataCard) => {
        let data = localStorage.getItem("cards");

        if (data) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const existingItem = data.find(item => item.id === dataCard.id);
        if (existingItem) {
            existingItem.piece += 1;
            existingItem.price += Number(dataCard.price);
        } else {
            data.push({
                name: dataCard.title,
                img: dataCard.img,
                price: Number(dataCard.price),
                piece: 1,
                id: dataCard.id,
            });
        }
        localStorage.setItem("cards", JSON.stringify(data));

        notification.success({
            message: "Savatga qo'shildi !",
            description: "Tanlagan mahsulotingiz savatga qo'shildi. Savatga o'tib buyurtma berishingiz mumkin !"
        });

        setCount(count + 1);
    };


    const filteredBlog = blog.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='bg-white'>
            <section className="text-gray-600 body-font ">
                <div className="img">
                    <div className="container flex flex-wrap px-5 py-24 mx-auto items-center rounded-[50px]">
                        <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                                <font className="vertical-align: inherit;">
                                    <font className="vertical-align: inherit; font-bold text-[26.3px] from-neutral-200 text-white">Web Shop xarid qilish bo`limi.</font>
                                </font>
                            </h1>
                            <p className="leading-relaxed text-base">
                                <font className="vertical-align: inherit;">
                                    <font className="vertical-align: inherit; text-[15px] font-light text-white">Locavore cardigan kichik partiya uyingizda partiyasi ko`k shisha blog meggings sartorial jinsi shortilar kickstarter migas sriracha cherkov-key synth sukkulentlar. Aslida taiyaki neutra, distillery gastropub pok pok ugh.</font>
                                </font>
                            </p>
                            <a className="text-blue-500 cursor-pointer inline-flex items-center mt-4">
                                <font className="vertical-align: inherit;">
                                    <font className="vertical-align: inherit;">Batafsil ma`lumot</font>
                                </font>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                        <div className="flex flex-col md:w-1/2 md:pl-12">
                            <h2 className="title-font font-semibold text-gray-800 tracking-wider text-sm mb-3">
                                <font className="vertical-align: inherit;">
                                    <font className="vertical-align: inherit; text-white">KATEGORIYALAR</font>
                                </font>
                            </h2>
                            <nav className="flex flex-wrap list-none -mb-1">
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#96C9F4] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Birinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#FFF078] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Ikkinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-red-500 cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Uchinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#06D001] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">To`rtinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-pink-500 cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Beshinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#7071E8] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Oltinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#55AD9B] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Ettinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                                <li className="lg:w-1/3 mb-1 w-1/2">
                                    <a className="text-[#DCA47C] cursor-pointer hover:text-white">
                                        <font className="vertical-align: inherit;">
                                            <font className="vertical-align: inherit;">Sakkizinchi havola</font>
                                        </font>
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <div className='mt-[2px] border-black'>
                <marquee behavior="" direction="left" scrollamount="10">
                    <div className="w-full flex gap-10">
                        <img className='h-[100px] p-4' src={Logo} alt="" />
                        <img className="h-[100px]" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_168588.png" alt="" />
                        <img className="h-[100px]" src="https://pngfre.com/wp-content/uploads/nike-logo-18.png" alt="" />
                        <img className="h-[100px]" src="https://1000logos.net/wp-content/uploads/2023/10/Loro-Piana-Logo.png" alt="" />
                        <img className="h-[100px]" src="https://freelogopng.com/images/all_img/1691604371samsung-logo-png-black.png" alt="" />
                        <img className="h-[100px]" src={HP} alt="" />
                        <img className="h-[100px]" src="https://1000logos.net/wp-content/uploads/2021/06/Tom-Ford-logo.png" alt="" />
                        <img className='h-[100px]' src="https://freepngimg.com/save/32021-lenovo-logo-transparent-image/430x190" alt="" />
                        <img className='h-[100px]' src="https://cdn.icon-icons.com/icons2/3911/PNG/512/acer_logo_icon_247729.png" alt="" />
                        <img className='h-[100px]' src={MI} alt="" />
                        <img className='h-[100px]' src="https://www.futuristicgroup.com/wp-content/uploads/2016/05/polo-ralph-lauren-logo-vectorlogofree-2015.png" alt="" />
                        <img className='h-[100px] p-3' src={Logo} alt="" />
                    </div>
                </marquee>
            </div>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Master Cleanse Reliac Heirloom</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <circle cx="6" cy="6" r="3"></circle>
                                            <circle cx="6" cy="18" r="3"></circle>
                                            <path d="M20 4l-2 2-3-3 2-2 3 3zm0 10l-2 2-3-3 2-2 3 3zm0 10l-2 2-3-3 2-2 3 3z"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">The Catalyzer</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <circle cx="6" cy="6" r="3"></circle>
                                            <circle cx="6" cy="18" r="3"></circle>
                                            <path d="M20 4l-2 2-3-3 2-2 3 3zm0 10l-2 2-3-3 2-2 3 3zm0 10l-2 2-3-3 2-2 3 3z"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">Neptune</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font overflow-hidden">
                <div className="max-sm:px-0 container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Bizning mahsulotlarimiz</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Bizning so'nggi yangiliklarimiz va mahsulotlarimiz bilan tanishing.</p>
                        <div className="flex justify-center mt-8">
                            <LuSearchCode className='max-sm:left-4 relative top-3 left-7 text-blue-500' />

                            <input
                                type="search"
                                className="max-sm:w-[90%] max-sm:ml-[-3%] w-[100%] border-[1.7px] border-blue-600 text-blue-500 bg-white h-10 px-10 pr-3 rounded-lg text-sm focus:outline-none"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="max-sm:m-0 flex flex-wrap -m-[-1%]">
                        {filteredBlog.map((item, index) => (
                            <Fragment key={index}>
                                <div className="h-[500px] m-auto mb-10 max-sm:mb-[-10%]">
                                    <div className="flex flex-wrap">
                                        <div className="lg:w-1/2 md:w-1/2 p-4 max-sm:w-[10%]">
                                            <a className="max-sm:w-[150px] max-sm:h-[180px] w-[271px] block relative h-[271px] rounded overflow-hidden">
                                                <img alt="gallery" className="p-0 absolute inset-0 w-full h-full object-cover object-center border-[1px] border-black rounded-xl" src={item.img} />
                                                <div className="h-[271px] w-[271px] px-8 py-5 relative z-10 border-[1px] border-black rounded-xl bg-white opacity-0 hover:opacity-100  active:opacity-100 max-sm:w-[150px] max-sm:h-[180px] max-sm:px-5">
                                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 border-black rounded-xlmb-1 max-sm:text-[8px] max-sm:mb-3">webshop.uz</h2>
                                                    <br />
                                                    <h1 className="title-font text-lg font-medium text-blue-700 mb-3
                                                    max-sm:mb-10 max-sm:text-[13px] max-sm:mt-[-30%]">Web Shop</h1>
                                                    <p className="mt-0 leading-relaxed max-sm:mt-[-30%] max-sm:text-[9px]">{item.matn}</p>
                                                </div>
                                                <img alt="ecommerce" className="object-cover object-center w-[550px] h-[300px] " src={item.img} />
                                            </a>
                                            <div className="max-sm:w-[100px] max-sm:p-0 p-3 mt-5 ml-3 w-[200px] h-[150px]">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                                                <h2 className="text-gray-900 title-font text-lg w-[200px] font-medium max-sm:text-[12px] max-sm:w-[130%]">{item.title}</h2><br />
                                                <div className='flex w-10'>
                                                    <del className='text-gray-500 w-[200px] mr-1 p-1'>{item.oldprice}</del>
                                                    <p className='text-white bg-blue-600 p-1 rounded'>{item.sale}%</p>
                                                </div>
                                                <div className='flex flex-wrap w-[271px]'>
                                                    <p className="text-blue-500 text-[20px] mt-5 text w-[100px] font-bold">{item.price} $</p>
                                                    <TbBasketPlus onClick={() => handleCart(item)} className='cursor-pointer mt-[24px] text-blue-500 text-[25px] ml-[38%] max-sm:ml-[-1%]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>

                        ))}
                    </div>
                </div>
            </section>
            
            <div className='mt-[2px] border-black'>
                <marquee behavior="" direction="right" scrollamount="10">
                    <div className="w-full flex gap-10">
                        <img className='h-[100px] p-4' src={Logo} alt="" />
                        <img className="h-[100px]" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_168588.png" alt="" />
                        <img className="h-[100px]" src="https://pngfre.com/wp-content/uploads/nike-logo-18.png" alt="" />
                        <img className="h-[100px]" src="https://1000logos.net/wp-content/uploads/2023/10/Loro-Piana-Logo.png" alt="" />
                        <img className="h-[100px]" src="https://freelogopng.com/images/all_img/1691604371samsung-logo-png-black.png" alt="" />
                        <img className="h-[100px]" src={HP} alt="" />
                        <img className="h-[100px]" src="https://1000logos.net/wp-content/uploads/2021/06/Tom-Ford-logo.png" alt="" />
                        <img className='h-[100px]' src="https://freepngimg.com/save/32021-lenovo-logo-transparent-image/430x190" alt="" />
                        <img className='h-[100px]' src="https://cdn.icon-icons.com/icons2/3911/PNG/512/acer_logo_icon_247729.png" alt="" />
                        <img className='h-[100px]' src={MI} alt="" />
                        <img className='h-[100px]' src="https://www.futuristicgroup.com/wp-content/uploads/2016/05/polo-ralph-lauren-logo-vectorlogofree-2015.png" alt="" />
                        <img className='h-[100px] p-3' src={Logo} alt="" />
                    </div>
                </marquee>
            </div>
            
            <Footer />
        </div>
    );
}

export default Blog;
