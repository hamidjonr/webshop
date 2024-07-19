import { Fragment, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from 'axios';
import { notification } from "antd";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from "./Footer";

function AddToCard() {
    const [web, setWeb] = useState([]);
    const [cost, setCost] = useState(0);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        message: '',
        username: '',
    });

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem("cards"));
        if (storedCards) {
            setWeb(storedCards);
            calculateTotalCost(storedCards);
        }
    }, []);

    const calculateTotalCost = (cards) => {
        const totalCost = cards.reduce((acc, item) => acc + item.price * item.piece, 0);
        setCost(totalCost);
    };

    const handleDelete = (index) => {
        const updatedCards = web.filter((_, i) => i !== index);
        setWeb(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        calculateTotalCost(updatedCards);
        window.location.reload();
    };

    const handleIncrement = (index) => {
        const updatedCards = web.map((item, i) => {
            if (i === index) {
                return { ...item, piece: item.piece + 1 };
            }
            return item;
        });
        setWeb(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        calculateTotalCost(updatedCards);
    };

    const handleDecrement = (index) => {
        const updatedCards = web.map((item, i) => {
            if (i === index && item.piece > 1) {
                return { ...item, piece: item.piece - 1 };
            }
            return item;
        });
        setWeb(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        calculateTotalCost(updatedCards);
    };

    const showModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            number: value
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendTelegram = async () => {
        const { name, username, number, message } = formData;
        const localStoragedata = JSON.parse(localStorage.getItem('cards'));

        // Formatting the cart data into a readable string
        let orderDetails = localStoragedata.map(item => {
            return `Mahsulot nomi: ${item.name}\nNarxi: ${item.price}$ \nSoni: ${item.piece} dona`;
        }).join('\n\n');

        const telegram_bot_id = '7281401106:AAEaVtMaVrKUjatcDrQxaOVt3DfvUDMQAuk'; // Replace with your bot token
        const chat_id = 5332949494; // Replace with the chat ID

        const data = {
            chat_id: chat_id,
            text: `Buyurtma bergan odamning: \n\nIsmi: ${name} \nTelegram username: @${username} \nNomeri: +${number}\nDastavka manzili: ${message}\n\nBuyurtmalar:\n\n${orderDetails}\n\nJami narxi: ${cost} $`
        };

        try {
            const response = await axios.post(
                `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                }
            );
            console.log(response.data);

            // Clear localStorage after successful submission
            localStorage.removeItem('cards');
            window.location.reload();
        } catch (error) {
            console.error('Error sending message to Telegram', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.number && formData.message) {
            sendTelegram();
            setFormData({
                name: '',
                number: '',
                message: '',
                username: '',
            });
            closeModal();
        } else {
            notification.error({
                message: "Ma'lumotlar yetarli emas!",
                description: "Buyurtma berish uchun barcha maydonlarni to'ldiring!"
            });
        }
    };

    return (
        <div className="bg-white">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <div>
                            <hr className="border-black mb-3" />
                            <div className="font-bold text-blue-500 flex justify-between mx-3">
                                <h1>Img</h1>
                                <h1>Name</h1>
                                <h1>Price</h1>
                                <h1>Piece</h1>
                                <h1>Delete</h1>
                            </div>
                            <hr className="border-black mt-3" />
                        </div>
                        <div className="flex flex-col">
                            {web.length > 0 ? web.map((data, index) => (
                                <Fragment key={index}>
                                    <div className="mt-3 w-[100%] flex justify-between items-center mb-3">
                                        <img className="w-[10%] h-[10%]" name="img" id="img" src={data.img} alt="" />
                                        <b className="w-[10%] ml-[-5%] text-center" name="nameprodust" id="nameprodust">{data.name}</b>
                                        <p className="text-[20px] ml-[-1.5%]" name="price" id="price">{data.price} $</p>
                                        <div className="w-16 text-[22px] text-center flex items-center justify-center">
                                            <FaMinus className="cursor-pointer" onClick={() => handleDecrement(index)} />
                                            <p className="mx-2">{data.piece}</p>
                                            <FaPlus className="cursor-pointer" onClick={() => handleIncrement(index)} />
                                        </div>
                                        <MdDelete className="text-[25px] text-blue-500 w-16 text-center cursor-pointer" onClick={() => handleDelete(index)} />
                                    </div>
                                </Fragment>
                            )) : (
                                <div className="p-[40px]">
                                    <img src="https://mykit.in/public/img/images/emptycart.svg" alt="Empty Cart" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                        <div>
                            <h1 className="text-blue-500 text-[20px]">Jami narxi: <span className=" text-black">{cost} $</span></h1>
                        </div>
                        {show ? (
                            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                <div className="bg-white p-8 rounded-lg flex flex-col max-w-md">
                                    <h2 className="text-2xl font-bold mb-4"><h1><font className="text-red-500 text-[18px]">Iltimos !</font></h1 ><p className="text-blue-500">Ma'lumotlarni to'liq va tushunarli kiriting...</p></h2>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Ismingiz"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                                    />
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Telegram username kiriting: @webshop2024"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                                    />
                                    <PhoneInput
                                        inputProps={{
                                            name: 'number',
                                            id: 'number'
                                        }}
                                        country={'uz'}
                                        value={formData.number}
                                        onChange={handlePhoneChange}
                                        className="w-full bg-white rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out mb-4"
                                    />
                                    <input
                                        name="message"
                                        id="message"
                                        placeholder="Buyurtma manzili:"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                                    />
                                    <div className="flex justify-end">
                                        <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mr-2" onClick={closeModal}>Close</button>
                                        <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" type="submit" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={showModal}>Tasdiqlash</button>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AddToCard;
