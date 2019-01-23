export function authorsFormattedForDropdown(authors){
  return authors.map(author => {
    return {
      //transforming id,fN,lN to value and text
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}

//extract this function from mSTP
//functions which transforms data or manupulates data can be considered placing here.
