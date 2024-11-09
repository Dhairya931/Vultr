import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'
import { useEffect, useState } from 'react'

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if (search.get('sign-in')){ setShowSignIn(true)}
  }, [search]);

  const handleOverlayClick=(e) => {
    if(e.target === e.currentTarget){
      setShowSignIn(false);
      setSearch({});
    }
  }
  return (
    <>
      <nav className='p-2 flex justify-between items-center'>
        <Link>
          <div className='flex items-center'>
          <img src='/logo.png' alt='JobGenie logo' className="h-20 rounded-full p-2" />
          <p>JobGenie</p>
          </div>
        </Link>
        <div className=''>
          <ul className='flex items-center gap-8'>
            <li><Link to='/skill_connect'>
          <Button variant="blue" size="lg">SkillConnect</Button>
        </Link></li>
            <li><Link to='/jobs'>
          <Button variant="secondary" size="lg">Gennie</Button>
        </Link></li>
          </ul>
        </div>
        <div className='flex gap-8'>
          <SignedOut>
            <Button variant='outline' onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            {/* Add a condition to show this only to recruiters */}

            {user?.unsafeMetadata?.role === "recruiter" && 
              (<Link to="/post-job">
            <Button variant='destructive' className="rounded-full">
              <PenBox size={20} className='mr-2'/>
              Post Job</Button>
            </Link>)}
            <UserButton 
            appearance={{
              elements: {
                avatarBox:"w-10 h-10",
              }
            }}
            >

              <UserButton.MenuItems>
                <UserButton.Link 
                label = "My Jobs"
                labelIcon={<BriefcaseBusiness size={15}/>}
                href='/my-jobs'
                />
              
              <UserButton.Link 
                label = "Saved Jobs"
                labelIcon={<Heart size={15}/>}
                href='/saved-jobs'
                />


              </UserButton.MenuItems>

            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div className='fixed inset-0 flex items-center justify-center bg-black-opacity-50' onClick={handleOverlayClick}>
          <SignIn signUpForceRedirectUrl='/onboarding'
          fallbackRedirectUrl='/onboarding'/>
        </div>
      )}
    </>
  )
}

export default Header
