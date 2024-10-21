# To Add Recommendation / Insert
http://localhost:80/BookNest/bookstore-backend/addRecommendation.php
{
    "book_id": 29,
    "user_id": 13
}

# To get recommendation
http://localhost:80/BookNest/bookstore-backend/getRecommendation.php?user_id=22
{"status":"success","recommendations":[{"id":21,"title":"The HarryPoter","image":"image1.png"}]}


# Table added 
- recommendation
      - id
      - user_id
      - book_id
      - user_click
