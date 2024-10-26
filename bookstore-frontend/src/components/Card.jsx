import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Card = ({ book }) => {
  const [user, setUser] = useState({});
  console.log(book);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  

  // to={`/books/${book.id}`}

  function handleAddRecommendation(bookId) {
    const data = {
      book_id: bookId,
      user_id: user.id,
    };
    axios
      .post(
        "http://localhost:80/BookNest/bookstore-backend/addRecommendation.php",
        data
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    
    navigate(`/books/${bookId}`);
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {book &&
            book?.map((book) => (
              <div
                key={book?.id}
                className="h-auto transition-shadow duration-300 ease-in-out transform bg-white rounded-lg shadow-md w-60 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-full h-[40%]">
                  <img
                    src={"/uploads/" + book?.image}
                    alt={book?.name}
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
                  <p className="px-3 py-1 text-sm font-semibold text-center text-blue-600 transition-colors bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200">
                    {book?.s_name}
                  </p>

                  <h1 className="text-lg font-semibold text-gray-800 truncate">
                    {book?.title}
                  </h1>
                  <p className="text-gray-600 text-md">Rs{book?.price}</p>
                </div>
                {/* Read More Button */}
                <div className="p-4">
                  {user != null ? (
                    <Link
                      onClick={(e) => handleAddRecommendation(book?.id)}
                      className="inline-block w-full px-4 py-2 font-semibold text-center text-white transition-colors duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Read More
                    </Link>
                  ) : (
                    <Link
                      to={`/books/${book?.id}`}
                      className="inline-block w-full px-4 py-2 font-semibold text-center text-white transition-colors duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Card;
