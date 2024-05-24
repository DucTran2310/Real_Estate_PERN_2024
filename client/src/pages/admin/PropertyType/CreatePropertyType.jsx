import { apiCreateNewPropertyType } from "@apis/propertyTypes"
import { Button, InputFile, InputForm, TextArea, Title } from "@components/index"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaRegPlusSquare } from "react-icons/fa"
import { toast } from "react-toastify"

const CreatePropertyType = () => {

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
    clearErrors,
    setError
  } = useForm()

  const [resetImages, setResetImages] = useState(false)

  const handleCreateNewPropertyType = async (data) => {

    if(!data.images || data.images.length === 0) {
      setError('images', {
        message: "This field cannot empty",
        type: "required"
      })
    } else {
      const {images, ...payload} = data
      const response = await apiCreateNewPropertyType({...payload, image: images[0]})

      if (response.success) {
        toast.success(response.toastMessage)
        reset()
        getImages([])
        setResetImages((prev) => !prev)
      } else toast.error(response.toastMessage)
    }
  }

  const getImages = (images) => {
    if (images && images.length > 0) {
      clearErrors("images")
    }
    setValue(
      "images",
      images?.map((el) => el.path)
    )
  }

  return (
    <div className="">
      <Title title={"Create New Property Type"} >
        <Button handleOnClick={handleSubmit(handleCreateNewPropertyType)}>
          <FaRegPlusSquare /> Create
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(handleCreateNewPropertyType)}>
        <InputForm 
          id="name"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot be empty' }}
          label={"Property Type Name"}
        />
        <TextArea 
          id='description'
          register={register}
          errors={errors}
          setValue={setValue}
          label="Description"
          validate={{ required: 'This field cannot be empty' }}
        />
        <InputFile
          id="images"
          register={register}
          errors={errors}
          validate={{ required: "This field cannot empty" }}
          label="Image"
          // multiple={true}
          getImages={getImages}
          resetImages={resetImages}
        />
      </form>
    </div>
  )
}

export default CreatePropertyType
