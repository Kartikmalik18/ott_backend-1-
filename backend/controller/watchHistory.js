const User = require('../models/userModel'); 

//Function to add movie to watch History
const addMovieToWatchHistory = async (req, res) => {
    const { movieId, movieData } = req.body; 

    try {
        const user = await User.findById(req.userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        // Check if movie is already in watch-history
        const existingMovie = user.watchhistory.find(movie => movie.imdbId === movieData.imdbId);
        if (existingMovie) {
          return res.status(400).json({ message: 'Movie already in watch history' });
        }

        // Add the movie to watch-history
        user.watchhistory.push(movieData);
        await user.save();

        res.status(200).json({ message: 'Movie added to watch history', watchhistory: user.watchhistory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Function to remove a movie from the user's wishlist
const removeMovieFromWatchHistory = async (req, res) => {
    const { imdbId } = req.body;
  
    if (!imdbId || typeof imdbId !== 'string') {
      return res.status(400).json({ message: 'Invalid imdbId' });
    }
  
    try {
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const movieExists = user.watchhistory.some(movie => movie.imdbId.toString() === imdbId);
  
      if (!movieExists) {
        return res.status(400).json({ message: 'Movie not found in watch history' });
      }
  
      user.watchhistory = user.watchhistory.filter(movie => movie.imdbId.toString() !== imdbId);
      await user.save();
  
      return res.status(200).json({ message: 'Movie removed from watch history', watchhistory: user.watchhistory });
    } catch (error) {
      console.error("Error removing movie from watch history:", error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {addMovieToWatchHistory, removeMovieFromWatchHistory};