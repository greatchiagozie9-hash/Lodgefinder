-- ========================================================
-- LODGEFINDER FUTO - SUPABASE DATABASE SCHEMA & RLS
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Role-Based Admin Access)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'landlord', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. LODGES TABLE
CREATE TABLE IF NOT EXISTS public.lodges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT,
    area TEXT NOT NULL CHECK (area IN ('Eziobodo', 'Umuchima')),
    property_type TEXT NOT NULL CHECK (property_type IN ('Self-Contain', 'Single Room', 'One-Bedroom Apartment', 'Two-Bedroom Apartment', 'Shared Accommodation')),
    annual_rent NUMERIC NOT NULL CHECK (annual_rent >= 0),
    caution_fee NUMERIC CHECK (caution_fee >= 0),
    agency_fee NUMERIC CHECK (agency_fee >= 0),
    agreement_fee NUMERIC CHECK (agreement_fee >= 0),
    other_fees NUMERIC CHECK (other_fees >= 0),
    bedrooms INTEGER DEFAULT 1,
    bathrooms INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    landmark TEXT,
    distance_to_futo_km NUMERIC,
    travel_time_minutes INTEGER,
    has_water BOOLEAN DEFAULT false,
    has_electricity BOOLEAN DEFAULT false,
    has_private_toilet BOOLEAN DEFAULT false,
    has_kitchen BOOLEAN DEFAULT false,
    has_fenced_compound BOOLEAN DEFAULT false,
    availability_status TEXT DEFAULT 'Available' CHECK (availability_status IN ('Available', 'Occupied', 'Under Renovation')),
    landlord_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_phone TEXT,
    email TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. LODGE IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.lodge_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lodge_id UUID NOT NULL REFERENCES public.lodges(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. INSPECTION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.inspection_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lodge_id UUID NOT NULL REFERENCES public.lodges(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_lodges_area ON public.lodges(area);
CREATE INDEX IF NOT EXISTS idx_lodges_status ON public.lodges(status);
CREATE INDEX IF NOT EXISTS idx_lodges_rent ON public.lodges(annual_rent);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lodges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lodge_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- LODGES POLICIES ---
-- 1. Anyone can view APPROVED lodges
CREATE POLICY "Public can view approved lodges"
ON public.lodges FOR SELECT
USING (status = 'approved');

-- 2. Authenticated Admins can view ALL lodges (pending, approved, rejected)
CREATE POLICY "Admins can view all lodges"
ON public.lodges FOR SELECT
TO authenticated
USING (public.is_admin());

-- 3. Anyone can submit a lodge, but force its initial status to 'pending'
CREATE POLICY "Public can insert pending lodges"
ON public.lodges FOR INSERT
WITH CHECK (status = 'pending');

-- 4. Only Admins can update lodges (approving, rejecting, updating info)
CREATE POLICY "Only admins can update lodges"
ON public.lodges FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 5. Only Admins can delete lodges
CREATE POLICY "Only admins can delete lodges"
ON public.lodges FOR DELETE
TO authenticated
USING (public.is_admin());

-- --- LODGE IMAGES POLICIES ---
-- Public can view images for approved lodges
CREATE POLICY "Public can view images of approved lodges"
ON public.lodge_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.lodges
    WHERE lodges.id = lodge_images.lodge_id AND (lodges.status = 'approved' OR public.is_admin())
  )
);

-- Anyone submitting can insert lodge images
CREATE POLICY "Public can insert images for lodges"
ON public.lodge_images FOR INSERT
WITH CHECK (true);

-- --- INSPECTION REQUESTS POLICIES ---
-- Public can submit an inspection request
CREATE POLICY "Public can submit inspection request"
ON public.inspection_requests FOR INSERT
WITH CHECK (true);

-- Only Admins can read inspection requests
CREATE POLICY "Only admins can view inspection requests"
ON public.inspection_requests FOR SELECT
TO authenticated
USING (public.is_admin());

-- Only Admins can update inspection status
CREATE POLICY "Only admins can update inspection requests"
ON public.inspection_requests FOR UPDATE
TO authenticated
USING (public.is_admin());

-- --- HOW TO CREATE YOUR FIRST ADMIN USER ---
-- 1. Sign up a user in Supabase Authentication tab with email/password.
-- 2. Run this query in your SQL editor using that user's ID:
-- INSERT INTO public.profiles (id, email, role)
-- VALUES ('<PASTE-USER-UUID-HERE>', 'admin@futoaccommodations.ng', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';