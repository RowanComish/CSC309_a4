var Review = require('../app/models/reviews')

//finds the reviews for a given recipe
module.exports = function(recipeIDParam, lastIDParam){
    
    var limitNumreviews = 10;
    
    // Retrieve n reviews for recipe with ID less than lastID sorted by most recent
    var reviews;
    if (lastIDParam != null) 
        reviews = Review.find({recipeID:recipeIDParam, _id : {$lt: lastIDParam }}).populate('userID').sort( [['_id', -1]]).limit(limitNumreviews);
    else 
        reviews = Review.find({recipeID:recipeIDParam}).populate('userID').sort( [['_id', -1]] ).limit(limitNumreviews);
        
	return reviews;
}	