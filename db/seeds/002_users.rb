
puts "Creating Users"

User.create!(full_name:"Haily Tutee", email:"htutee@fake.com", school_id:1, grade:'sophmore', password:'Abc123!', role:'tutee')
User.create!(full_name:"Eric Tutee", email:"etutee@fake.com", school_id:1, grade:'senior', password:'Abc123!', role:'tutee')
User.create!(full_name:"Abbygail Tutee", email:"atutee@fake.com", school_id:1, grade:'freshman', password:'Abc123!', role:'tutee')
User.create!(full_name:"Kevin Tutor", email:"ktutor@fake.com", school_id:1, grade:'senior', password:'Abc123!', role:'tutor')
User.create!(full_name:"Deniece Tutor", email:"Dtutor@fake.com", school_id:1, grade:'senior', password:'Abc123!', role:'tutor')
User.create!(full_name:"Kevin Admin", email:"kadmin@fake.com", school_id:1, grade:'Admin', password:'Abc123!', role:'admin')

User.create!(full_name:"Haily Baily", email:"htutee2@fake.com", school_id:2, grade:'sophmore', password:'Abc123!', role:'tutee')
User.create!(full_name:"Eric Davison", email:"etutee2@fake.com", school_id:2, grade:'senior', password:'Abc123!', role:'tutee')
User.create!(full_name:"Abby Mac", email:"atutee2@fake.com", school_id:2, grade:'freshman', password:'Abc123!', role:'tutee')
User.create!(full_name:"Kevin Mister", email:"ktutor2@fake.com", school_id:2, grade:'senior', password:'Abc123!', role:'tutor')
User.create!(full_name:"Deniece Misses", email:"Dtutor2@fake.com", school_id:2, grade:'senior', password:'Abc123!', role:'tutor')
User.create!(full_name:"Kevin Adams", email:"kadmin2@fake.com", school_id:2, grade:'Admin', password:'Abc123!', role:'admin')
