const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = "Last Modification: " + lastModified;



const mainnav = document.querySelector('.nav_links')
const hambutton = document.querySelector('#hamburger');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});


const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.', technology: ['Python'], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.', technology: ['HTML', 'CSS'], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.', technology: ['Python'], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.', technology: ['C#'], completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
];

const courseGrid = document.getElementById('courseGrid');
const totalCreditsDisplay = document.getElementById('totalCredits');

// Function to calculate total credits for the currently displayed courses
function calculateTotalCredits(coursesToDisplay) {
  return coursesToDisplay.reduce((total, course) => total + course.credits, 0);
}

// Function to display courses and total credits
function displayCourses(coursesToDisplay) {
  courseGrid.innerHTML = '';
  coursesToDisplay.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');
    if (course.completed) {
      courseDiv.classList.add('completed');
    }
    courseDiv.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
    `;
    courseGrid.appendChild(courseDiv);
  });

  // Update total credits displayed
  const totalCredits = calculateTotalCredits(coursesToDisplay);
  totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(subject) {
  document.querySelectorAll('.filter').forEach(button => button.classList.remove('active'));
  document.getElementById(subject.toLowerCase() + '-btn').classList.add('active');

  if (subject === 'All') {
    displayCourses(courses);
  } else {
    const filteredCourses = courses.filter(course => course.subject === subject);
    displayCourses(filteredCourses);
  }
}

// Initial display of all courses and total credits
displayCourses(courses);
