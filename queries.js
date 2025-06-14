//add .gitignore file to ignore node_modules


// installing dependencies
//npm install 


// importing database data
//node insert_books.js

//starting mongoDB server

//mongosh

// Use the database

//use plp_bookstore

//CRUD Operations on the books collection

// Find all books in a specific genre
db.books.find({ genre: "Adventure" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" })

// Update the price of a specific book
db.books.updateOne(
  { title: "The Lord of the Rings" },
  { $set: { price: 29.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" })

//Advanced Queries

// Books in stock and published on or after 1960
db.books.find({
  in_stock: true,
  published_year: { $gte: 1960 }
})

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price ascending
db.books.find().sort({ price: 1 })

// Sorting by price descending
db.books.find().sort({ price: -1 })

// Pagination (Page 1)
db.books.find().skip(0).limit(5)

// Pagination (Page 2)
db.books.find().skip(5).limit(5)


// Aggregation pipeline

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", total_books: { $sum: 1 } } },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and sort by decade
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
])

//indexing

// Index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to demonstrate performance
db.books.find({ title: "The Alchemy" }).explain("executionStats")

