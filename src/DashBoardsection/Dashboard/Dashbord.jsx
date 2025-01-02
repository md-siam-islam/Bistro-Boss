
import { NavLink, Outlet } from 'react-router-dom';
import { FaCartPlus,FaHome,FaCalendar,FaWallet ,FaList} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const Dashbord = () => {
    return (
        <div className='flex gap-8 '>
            <div className='w-64 min-h-screen px-5 py-8 bg-orange-800'>
                <ul className='menu p-4'>
                    <li>
                        <NavLink to={'/dashboard/home'} className='font-bold my-2 uppercase'> <FaHome></FaHome>User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'} className='font-bold my-2 uppercase'> <FaCartPlus></FaCartPlus>My Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'} className='font-bold my-2 uppercase'> <FaCalendar></FaCalendar>reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/payment'} className='font-bold my-2 uppercase'> <FaWallet></FaWallet>payment history</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'} className='font-bold my-2 uppercase'> <MdReviews />add review</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/booking'} className='font-bold my-2 uppercase'> <BsBookmarkPlusFill />my booking</NavLink>
                    </li>

                    <div className='divider my-5'></div>
                    <li>
                        <NavLink to={'/'} className='font-bold my-2 uppercase'> <FaHome></FaHome>User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'} className='font-bold my-2 uppercase'> <FaList></FaList>menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/shop/salad'} className='font-bold my-2 uppercase'> <FaBagShopping></FaBagShopping>shop</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'} className='font-bold my-2 uppercase'> <MdEmail />contact</NavLink>
                    </li>
                </ul>
            </div>

            <div className='flex-1 px-8 py-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashbord;