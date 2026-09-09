import request from "./client";

export type AlumniStatus = 'PENDING' | 'APPROVED';

export type BlogCategory =
  | 'Interview Experience'
  | 'Career Advice'
  | 'Referral Tips'
  | 'General';

export interface Alumni {
  id: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hashNodeUrl?: string;
  devToUrl?: string;

  graduationYear?: number;
  currentCompany?: string;
  currentRole?: string;
  department?: string;
  linkedIn?: string;

  alumniStatus?: AlumniStatus;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  description?: string;
  category: BlogCategory;
  postedDate: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  alumniId: string;
  published: boolean;
}

export interface Referral {
  id: string;
  alumniId: string;
  companyName: string;
  role: string;
  description: string;
  postedDate: string;
  active: boolean;
}

/*
 * Request contracts.
 */

export interface AlumniRegistrationRequest {
  name: string;
  email: string;
  password?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hashNodeUrl?: string;
  devToUrl?: string;

  graduationYear?: number;
  currentCompany?: string;
  currentRole?: string;
  department?: string;
  linkedIn?: string;
}

export interface AlumniLoginRequest {
  email: string;
  password?: string;
}

export interface AlumniProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hashNodeUrl?: string;
  devToUrl?: string;

  graduationYear?: number;
  currentCompany?: string;
  currentRole?: string;
  department?: string;
  linkedIn?: string;
}

export interface BlogRequest {
  title: string;
  content?: string;
  description?: string;
  category?: BlogCategory;
  published?: boolean;
  alumniId?: number | string;
}

export interface ReferralRequest {
  companyName: string;
  role: string;
  description: string;
  active: boolean;
}

const ALUMNI_KEY = 'placex_alumni';
const BLOG_KEY = 'placex_alumni_blogs';
const REFERRAL_KEY = 'placex_alumni_referrals';

const write = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const alumniApi = {
  async getAll(): Promise<Alumni[]> {
    const res = await request<any[]>('/alumni/all');
    if (!Array.isArray(res)) return [];
    return res.map((a: any) => ({
      id: String(a.id),
      name: a.name || '',
      email: a.email || '',
      bio: a.bio || '',
      location: a.location || '',
      linkedinUrl: a.linkedinUrl || a.linkedIn || '',
      githubUrl: a.githubUrl || '',
      hashNodeUrl: a.hashNodeUrl || '',
      devToUrl: a.devToUrl || '',
      graduationYear: a.graduationYear || 2024,
      currentCompany: a.currentCompany || '',
      currentRole: a.currentRole || '',
      department: a.department || 'CSE',
      linkedIn: a.linkedinUrl || a.linkedIn || '',
      alumniStatus: 'APPROVED'
    }));
  },

  async getById(id: string | number): Promise<Alumni> {
    const a = await request<any>(`/alumni/${id}`);
    return {
      id: String(a.id),
      name: a.name || '',
      email: a.email || '',
      bio: a.bio || '',
      location: a.location || '',
      linkedinUrl: a.linkedinUrl || '',
      githubUrl: a.githubUrl || '',
      hashNodeUrl: a.hashNodeUrl || '',
      devToUrl: a.devToUrl || '',
      graduationYear: a.graduationYear || 2024,
      currentCompany: a.currentCompany || '',
      currentRole: a.currentRole || '',
      department: a.department || 'CSE',
      linkedIn: a.linkedinUrl || '',
      alumniStatus: 'APPROVED'
    };
  },

  saveAll(alumni: Alumni[]) {
    write(ALUMNI_KEY, alumni);
  },

  async register(requestData: AlumniRegistrationRequest): Promise<any> {
    return this.add(requestData);
  },

  async add(requestData: AlumniRegistrationRequest): Promise<any> {
    return request<string>('/alumni/add', {
      method: 'POST',
      body: JSON.stringify({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password || 'password',
        bio: requestData.bio || requestData.currentRole || '',
        location: requestData.location || '',
        linkedinUrl: requestData.linkedinUrl || requestData.linkedIn || '',
        githubUrl: requestData.githubUrl || '',
        hashNodeUrl: requestData.hashNodeUrl || '',
        devToUrl: requestData.devToUrl || ''
      }),
    });
  },

  async login(requestData: AlumniLoginRequest): Promise<any> {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: requestData.email,
        password: requestData.password || '',
        role: 'ALUMNI'
      })
    });
  },

  async approve(id: string | number): Promise<void> {
    await request<string>(`/alumni/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: Number(id) })
    });
  },

  async reject(id: string | number): Promise<void> {
    await request<string>(`/alumni/delete/${id}`, {
      method: 'DELETE',
    });
  },

  async getBlogs(): Promise<Blog[]> {
    const res = await request<any[]>('/blog/all');
    if (!Array.isArray(res)) return [];
    return res.map((b: any) => ({
      id: String(b.id),
      title: b.title || '',
      description: b.description || '',
      content: b.description || '',
      category: 'General',
      postedDate: b.createdAt || b.updatedAt || new Date().toISOString().split('T')[0],
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      alumniId: String(b.alumniId),
      published: true
    }));
  },

  saveBlogs(blogs: Blog[]) {
    write(BLOG_KEY, blogs);
  },

  async createBlog(alumniId: string | number, requestData: BlogRequest): Promise<any> {
    return request<string>('/blog/add', {
      method: 'POST',
      body: JSON.stringify({
        title: requestData.title,
        description: requestData.description || requestData.content || '',
        alumniId: Number(alumniId)
      }),
    });
  },

  async updateBlog(id: string | number, requestData: BlogRequest): Promise<any> {
    return request<string>(`/blog/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(id),
        title: requestData.title,
        description: requestData.description || requestData.content || '',
        alumniId: Number(requestData.alumniId || 1)
      }),
    });
  },

  async deleteBlog(id: string | number): Promise<void> {
    await request<string>(`/blog/delete/${id}`, {
      method: 'DELETE',
    });
  },

  async getReferrals(): Promise<Referral[]> {
    const data = localStorage.getItem(REFERRAL_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveReferrals(referrals: Referral[]) {
    write(REFERRAL_KEY, referrals);
  },

  async createReferral(alumniId: string, requestData: ReferralRequest): Promise<Referral> {
    const referrals = await this.getReferrals();
    const newRef: Referral = {
      id: String(Date.now()),
      alumniId,
      companyName: requestData.companyName,
      role: requestData.role,
      description: requestData.description,
      postedDate: new Date().toISOString().split('T')[0],
      active: requestData.active
    };
    referrals.push(newRef);
    this.saveReferrals(referrals);
    return newRef;
  },

  async updateReferral(id: string, requestData: ReferralRequest): Promise<Referral> {
    const referrals = await this.getReferrals();
    const idx = referrals.findIndex(r => r.id === id);
    if (idx !== -1) {
      referrals[idx] = { ...referrals[idx], ...requestData };
      this.saveReferrals(referrals);
      return referrals[idx];
    }
    throw new Error('Referral not found');
  },

  async deleteReferral(id: string): Promise<void> {
    const referrals = await this.getReferrals();
    const filtered = referrals.filter(r => r.id !== id);
    this.saveReferrals(filtered);
  },

  async getProfile(id: string | number): Promise<Alumni> {
    return this.getById(id);
  },

  async updateProfile(id: string | number, requestData: AlumniProfileRequest): Promise<any> {
    return request<string>(`/alumni/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(id),
        name: requestData.name,
        bio: requestData.bio || requestData.currentRole,
        location: requestData.location,
        linkedinUrl: requestData.linkedinUrl || requestData.linkedIn,
        githubUrl: requestData.githubUrl,
        hashNodeUrl: requestData.hashNodeUrl,
        devToUrl: requestData.devToUrl
      }),
    });
  },

  async update(id: string | number, requestData: Partial<Alumni>): Promise<any> {
    return request<string>(`/alumni/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(id),
        name: requestData.name,
        email: requestData.email,
        bio: requestData.bio || requestData.currentRole,
        location: requestData.location,
        linkedinUrl: requestData.linkedinUrl || requestData.linkedIn,
        githubUrl: requestData.githubUrl,
        hashNodeUrl: requestData.hashNodeUrl,
        devToUrl: requestData.devToUrl
      }),
    });
  },

  async delete(id: string | number): Promise<void> {
    await request<string>(`/alumni/delete/${id}`, {
      method: 'DELETE',
    });
  },
};
