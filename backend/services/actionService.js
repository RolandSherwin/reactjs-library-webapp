// borrow book -> reduce available book if >0, add to user ( 1 per user)
// return book -> increase book if, remove from user
// reserve book -> if available book = 0, reserve a book -> add user to queue 
// for the book; inside return book, if available becomes > 1, then 
// call borrow book with user in the first

