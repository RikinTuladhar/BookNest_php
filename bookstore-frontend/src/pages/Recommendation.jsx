import  { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Recommendation = () => {
    const {id} = useParams()
    const [books,setBooks] = useState([])
    console.log(id)
    useEffect(()=>{
        axios.get(`http://localhost:80/BookNest/bookstore-backend/getRecommendation.php?user_id=${id}`)
        .then((res)=>{
            console.log(res.data.recommendations)
            setBooks(res.data.recommendations)
        }).catch((err)=>console.log(err))
    },[])
  return (
    <div>
      <div className="mt-9">
            <h1 className="pb-5 pl-32 text-4xl text-blue-500">Recommendation Books</h1>
           <div>
           <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {books && books?.map((book) => (
            <div
              key={book?.id}
              className="h-auto transition-shadow duration-300 ease-in-out transform bg-white rounded-lg shadow-md w-60 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-full h-[40%]">
                <img
                  src={"/uploads/" + book.image}
                  alt={book.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderEndEndRadius: "10px",
                    objectFit: "cover",
                  }}
                  // onError={(e) => (e.target.src = "notfound.jpg")}
                />
              </div>
              {/* Book Details */}
              <div className="flex flex-col gap-2 p-4">
                {/* <p className="px-3 py-1 text-sm font-semibold text-center text-blue-600 transition-colors bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200">
                  {book.s_name}
                </p> */}

                <h1 className="text-lg font-semibold text-gray-800 truncate">
                  {book.title}
                </h1>
                <p className="text-gray-600 text-md">Rs{book.price}</p>
              </div>
              {/* Read More Button */}
              <div className="p-4">
                <Link
                  to={`/books/${book.id}`}
                  className="inline-block w-full px-4 py-2 font-semibold text-center text-white transition-colors duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
           </div>
          </div>
    </div>
  )
}

export default Recommendation
