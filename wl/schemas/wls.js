export default {
  name: 'Addresses',
  type: 'document',
	title: 'WL',
  fields: [
    {
      name: 'address',
      title: 'Address',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}