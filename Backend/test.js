const leadSchema = mongoose.schema({
name: {
  type: String,
  required: true
},
phone: {
  type: Number,
  required: true
},
service: {
  type: String,
  required: true
}

})