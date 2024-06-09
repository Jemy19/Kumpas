const [updateData, setUpdateData] = useState({
    id: null,
    title: '',
    description: '',
    category: '',
    video: '',
  });

  const vidUpRef = useRef(null);
  const updateWord = async (e, id, updatedData) => {
    e.preventDefault();
    try {
        let videoUrl = '';
        if (vidUpRef.current) {
          videoUrl = await vidUpRef.current.uploadVideo();
        }
        const urlString = videoUrl;
        const vidname = urlString.slice(urlString.lastIndexOf('/') + 1);
        updatedData.video = vidname;
      const response = await axios.put(`/updateWord/${id}`, updatedData, {
        withCredentials: true,
      });
  
      if (response.error) {
        toast.error(response.error)
      } else {
        console.log('Word updated successfully:');
        toast.success('Word Successfully Updated!');
        setWords((prevWords) => prevWords.map((word) =>
          word._id === id ? response.data : word
        ));
      }
    } catch (error) {
      console.error('An error occurred while updating the word:', error);
    }
  };

  const handleEdit = (word) => {
    setUpdateData({
      id: word._id,
      title: word.title,
      description: word.description,
      category: word.category,
      video: word.video,
    });
  };
<form onSubmit={(e) => updateWord(e, updateData.id, updateData)}>
<div className="grid gap-4">
<Label>Title</Label>
<Input
    type='text'
    placeholder='Enter Title...'
    value={updateData.title}
    onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
/>
<Label>Description</Label>
<Input
    type='text'
    placeholder='Enter Description...'
    value={updateData.description}
    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
/>
<Label>Category</Label>
<select
    name="category"
    value={updateData.category}
    onChange={(e) => setUpdateData({ ...updateData, category: e.target.value })}
    required
>
    <option value="" disabled>Select a category</option>
    {categories.map((category) => (
    <option key={category} value={category}>
        {category}
    </option>
    ))}
</select>
<Label>Video</Label>
<VidUp ref={vidUpRef} />
<SheetFooter>
    <SheetClose asChild>
    <Button type="submit">
        UPDATE
    </Button>
    </SheetClose>
</SheetFooter>
</div>
</form>