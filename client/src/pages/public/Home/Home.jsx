import banner from '@assets/images/banner.png'

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit">
        <img src={banner} alt='banner' className='w-full'/>
      </div>
    </div>
  )
}

export default Home