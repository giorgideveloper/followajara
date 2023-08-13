import PlaceButton from './PlaceButton'
import packages from './packages'

const TourPackage = ({ id }: { id: string }) => {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

    const data = packages.find(item => item.id == parseInt(id))


    return (
        <div className="max-w-full text-justify mt-10">
            <p>
                გილოცავთ, თქვენ წარმატებით გაიარეთ რეგისტრაცია.
            </p>
            <p className='my-3'>
                კამპანიაში ჩასართავად, 15 აგვისტოდან - 15 ოქტომბრის ჩათვლით, თქვენს მიერ წინასწარ დარეგისტრირებულ პლატფორმებზე (Facebook, YouTube, Instagram, Tik-Tok)  უნდა განათავსოთ ,,ტურისტულ პაკეტში” შემავალ თითოეულ პუნქტთან დაკავშირებით ერთი პოსტი მაინც. ჰეშთეგით - #გამომყევიაჭარაში
            </p>
            <p className='mb-3'>

                ტურისტულ პროდუქტებთან დაკავშირებით დამატებითი ინფორმაციის მისაღებად, დაუკავშირდით ტურისტულ საინფორმაციო ცენტრს:  577 90 90 93
            </p>

            <p>
                წარმატებებს გისურვებთ.
            </p>
            <div className="divider"></div>
            <h1 className="text-center text-xl">{romans[parseInt(id) - 1]} პაკეტის ინფორმაცია</h1>
            <div className='flex flex-wrap flex-row gap-5 mt-10 justify-center'>

                {data?.places.map((item, index) =>
                    <PlaceButton key={index} {...item} id={index} />
                )}
            </div>

            <p className='mt-5'>სასარგებლო ბმულების მისაღებად, დააკლიკე თითოეულ უჯრას</p>
            {/* <div dangerouslySetInnerHTML={{ __html: content }} className='text-black' /> */}
        </div>
    )
}

export default TourPackage