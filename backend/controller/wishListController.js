const User = require('../models/userModel'); 

//Function to add movie to wish List
const addMovieToWishlist = async (req, res) => {
    const { movieId, movieData } = req.body; 

    try {
        const user = await User.findById(req.userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        // Check if movie is already in wishlist
        const existingMovie = user.wishlist.find(movie => movie.imdbId === movieData.imdbId);
        if (existingMovie) {
          return res.status(400).json({ message: 'Movie already in wishlist' });
        }

        // Add the movie to wishlist
        user.wishlist.push(movieData);
        await user.save();

        res.status(200).json({ message: 'Movie added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Function to remove a movie from the user's wishlist
const removeMovieFromWishlist = async (req, res) => {
  const { imdbId } = req.body;

  if (!imdbId || typeof imdbId !== 'string') {
    return res.status(400).json({ message: 'Invalid imdbId' });
  }

  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieExists = user.wishlist.some(movie => movie.imdbId.toString() === imdbId);

    if (!movieExists) {
      return res.status(400).json({ message: 'Movie not found in wishlist' });
    }

    user.wishlist = user.wishlist.filter(movie => movie.imdbId.toString() !== imdbId);
    await user.save();

    return res.status(200).json({ message: 'Movie removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing movie from wishlist:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

  

module.exports = { addMovieToWishlist, removeMovieFromWishlist };
