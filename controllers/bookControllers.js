import Book from "../models/bookModels.js";

// Create Buku

const create = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.pages) {
      return res.status(400).json({
        status: "Error",
        message: "Gagal membuat buku. Harap isi semua field.",
      });
    }

    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "Success",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Read Buku
const getBokk = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Read Book id
const getBookID = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(404).json({
        status: "Error",
        message: "Buku tidak ditemukan.",
      });

      res.status(200).json({
        status: "Success",
        data: book,
      });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Update Buku
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!book) return res.status(404).json({
      status: "Error",
      message: "Buku tidak ditemukan.",
    })
    res.status(200).json({
      status: "Success",
      data: book,
    })
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    })
  }
}

// Delete Buku
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id) 
    if (!book) return res.status(404).json({
      status: "Error",
      message: "Buku tidak ditemukan.",
    });

    res.status(200).json({
      status: "Success",
      message: "Buku berhasil dihapus.", book,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    })
  }
}

const getAllBooksPage = async (req, res) => {
  try {
    const books = await Book.find(); // Mengambil semua buku dari database
    res.render("dashboard", { user: req.user, books }); // Kirim data buku ke halaman EJS
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


export { create, getBokk, getBookID, updateBook, deleteBook, getAllBooksPage };
