import { useEffect, useState } from 'react';
import { User, Mail, Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ProjectSubmission {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  status: string;
  createdAt: any;
}

export default function Profile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
          
          // Fetch submissions
          const submissionIds = userDoc.data().submissions || [];
          const submissionPromises = submissionIds.map((id: string) => 
            getDoc(doc(db, 'projects', id))
          );
          
          const submissionDocs = await Promise.all(submissionPromises);
          const submissionData = submissionDocs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as ProjectSubmission[];
          
          setSubmissions(submissionData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-gold mb-4">Access Denied</h2>
          <p className="text-gray-300">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-brand-gold/10"
      >
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-brand-gold/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={40} className="text-brand-gold" />
          </div>
          <h1 className="text-2xl font-bold text-brand-gold">{userProfile?.fullName}</h1>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Award className="text-brand-gold" size={24} />
              <span>Your Submissions</span>
            </h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-brand-primary/30 p-4 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-brand-gold">{submission.title}</h3>
                    <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-1 rounded">
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{submission.description}</p>
                  <div className="flex space-x-4">
                    {submission.githubUrl && (
                      <a
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-gold hover:underline flex items-center space-x-1"
                      >
                        <ExternalLink size={14} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {submission.demoUrl && (
                      <a
                        href={submission.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-gold hover:underline flex items-center space-x-1"
                      >
                        <ExternalLink size={14} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {submissions.length === 0 && (
                <p className="text-center text-gray-300">No submissions yet</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}