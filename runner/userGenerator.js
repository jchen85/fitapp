var fs = require('fs');
var path = require('path');
var random_name = require('node-random-name');

// bing image search type:photograph people:just faces search:guy

var femalePath = path.join(__dirname, 'user_pictures', 'female');
var malePath = path.join(__dirname, 'user_pictures', 'male');
var femaleImages = fs.readdirSync(femalePath);
var maleImages = fs.readdirSync(malePath);

export default function generateUser() {

  var gender = function() {
    if (Math.floor(Math.random() * 2) === 0) {
      return 'male';
    }
    return 'female';
  };

  var genderPreference = function(input) {
    // set to be 10% gay and 10% bisexual for diversity in testing
    let random = Math.floor(Math.random() * 10);
    if (random === 0) {
      return input;
    } else if (random === 1) {
      return 'both';
    }
    if (input === 'male') return 'female';
    return 'male';
  }


  var profilePic = function(gender) {
    var base = "/img/profilePics/";
    var filename = "";
    if (gender === 'male') {
      filename = maleImages[Math.floor(Math.random()*maleImages.length)];
    } else {
      filename = femaleImages[Math.floor(Math.random()*femaleImages.length)];
    }
    return String(base + gender + "/" + filename);
  };

  var start = new Date(1980, 0, 1); // selecting between age 21 and 42
  var end = new Date(1997, 0, 1);

  // Birthday needs to be in YYYY-MM-DD format for SQL
  // getMonth() returns 0 for Jan, 1 for Feb, etc, so need to increment it by 1
  var newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); 
  var birthdayStr = newDate.getFullYear() + '-' + function(){ return newDate.getMonth() + 1; }() + '-' + newDate.getDate();
  var birthday = newDate;

  var calculateAge = function(birthdate) { 
    var difference = Date.now() - birthdate;
    var ageDate = new Date(difference); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  var age = calculateAge(birthday);
  //console.log('AGE', age)
  var minAge = Math.ceil(age/2 + 7); // eh, seems fair
  var maxAge = (age-7)*2;

  var gender = gender();

  var fakeUser = {
    facebook_id: 12345,
    first_name: random_name({ first: true, gender: gender, seed: String(Math.random() * Date.now()) }),
    last_name: random_name({ last: true, seed: String(Math.random() * Date.now()) }),
    gender: gender,
    birthday: birthday, // TODO
    birthdayStr: birthdayStr, // Use birthdayStr if you want to insert into the DB
    status: true, // this can just be a boolean, whether they can be matched
    image_url: profilePic(gender)
  }

  return fakeUser;

}
