-- Add onboarding_completed field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Add comment
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Indicates if user has completed the onboarding flow';
