class BookedSlot < ApplicationRecord
    # May not need these plus they mess up the deployment because not all users have booked_tutors/tutees
  # belongs_to :booked_tutor, class_name:"User", foreign_key: 'tutor_id'
  # belongs_to :booked_tutee, class_name:"User", foreign_key: 'tutor_id'
  belongs_to :tutoring_time_slot

  def tutor
    tutor = User.find(tutor_id)
    subjects = []
    tutor.subjects_signed_up.each do |sub|
      subjects.push(sub.name)
    end
    {id:tutor.id, full_name:tutor.full_name, subjects_covered:subjects * ", "}
  end

  def tutee
    tutee = User.find(self.tutee_id)
    {id:tutee.id, full_name:tutee.full_name}
  end
end
