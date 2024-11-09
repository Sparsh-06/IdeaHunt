"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useState, ChangeEvent, FormEvent } from 'react'

const Profile = () => {
  // State for each input field
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [headline, setHeadline] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const {user} = useUser()

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    // Prepare data to send to backend
    const formData = {
      name,
      username,
      headline,
      company,
      role,
      about,
      avatar, // avatar as a base64 string (or you could handle this differently for larger files)
    }

    try {
      // Replace '/api/profile' with your actual API endpoint
      const response = await fetch('http://localhost:3200/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formData, userId: user?.id}),
      })

      if (response.ok) {
        console.log('Profile updated successfully')
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200">
      <Card className="w-full max-w-6xl p-8 bg-white dark:bg-slate-700/40 shadow-lg rounded-lg transition-colors duration-200">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Details</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-900 dark:text-gray-300">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 border-[0.1px] border-slate-400 dark:border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="username" className="text-gray-900 dark:text-gray-300">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 border-[0.1px] border-slate-400 dark:border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="headline" className="text-gray-900 dark:text-gray-300">Headline</Label>
                <Input
                  id="headline"
                  placeholder="Software Engineer | Tech Enthusiast"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="mt-1 border-[0.1px] border-slate-400 dark:border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-gray-900 dark:text-gray-300">Current Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 border-[0.1px] border-slate-400 dark:border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-gray-900 dark:text-gray-300">Your Role</Label>
                <Input
                  id="role"
                  placeholder="Senior Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 border-[0.1px] border-slate-400 dark:border-slate-600"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="about" className="text-gray-900 dark:text-gray-300">About</Label>
                <Textarea
                  id="about"
                  placeholder="Tell us about yourself..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="mt-1 h-32 border-[0.5px] border-slate-400 dark:border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="avatar" className="text-gray-900 dark:text-gray-300">Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {avatar ? (
                      <Image src={avatar} alt="Avatar preview" layout="fill" objectFit="cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      onClick={() => document.getElementById('avatar')?.click()}
                      variant="outline"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Upload new avatar
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">Recommended size: 400x400px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Profile
