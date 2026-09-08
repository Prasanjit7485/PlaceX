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

  graduationYear: number;
  currentCompany: string;
  currentRole: string;
  department: string;
  linkedIn: string;

  alumniStatus: AlumniStatus;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  category: BlogCategory;
  postedDate: string;
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
  graduationYear: number;
  currentCompany: string;
  currentRole: string;
  department: string;
  linkedIn: string;
}

export interface AlumniLoginRequest {
  email: string;
  password?: string;
}

export interface AlumniProfileRequest {
  name: string;
  graduationYear: number;
  currentCompany: string;
  currentRole: string;
  department: string;
  linkedIn: string;
}

export interface BlogRequest {
  title: string;
  content: string;
  category: BlogCategory;
  published: boolean;
}

export interface ReferralRequest {
  companyName: string;
  role: string;
  description: string;
  active: boolean;
}

/*
 * Local frontend repository storage keys.
 */

const ALUMNI_KEY = 'placex_alumni';
const BLOG_KEY = 'placex_alumni_blogs';
const REFERRAL_KEY = 'placex_alumni_referrals';

const write = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const alumniApi = {
  async getAll(): Promise<Alumni[]> {
    return request<Alumni[]>('/api/alumni');
  },

  async getById(id: string | number): Promise<Alumni> {
    return request<Alumni>(`/api/alumni/${id}`);
  },

  saveAll(alumni: Alumni[]) {
    write(ALUMNI_KEY, alumni);
  },

  async register(requestData: AlumniRegistrationRequest): Promise<Alumni> {
    return request<Alumni>('/api/alumni/register', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  async add(requestData: AlumniRegistrationRequest): Promise<Alumni> {
    return request<Alumni>('/api/alumni/register', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  async login(requestData: AlumniLoginRequest): Promise<Alumni> {
    return request<Alumni>('/api/alumni/login', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  async approve(id: string): Promise<void> {
    await request<void>(`/api/alumni/${id}/approve`, {
      method: 'PUT',
    });
  },

  async reject(id: string): Promise<void> {
    await request<void>(`/api/alumni/${id}/reject`, {
      method: 'DELETE',
    });
  },

  async getBlogs(): Promise<Blog[]> {
    return request<Blog[]>('/api/alumni/blogs');
  },

  saveBlogs(blogs: Blog[]) {
    write(BLOG_KEY, blogs);
  },

  async createBlog(alumniId: string, requestData: BlogRequest): Promise<Blog> {
    return request<Blog>(`/api/alumni/${alumniId}/blogs`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  async updateBlog(id: string, requestData: BlogRequest): Promise<Blog> {
    return request<Blog>(`/api/alumni/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  },

  async deleteBlog(id: string): Promise<void> {
    await request<void>(`/api/alumni/blogs/${id}`, {
      method: 'DELETE',
    });
  },

  async getReferrals(): Promise<Referral[]> {
    return request<Referral[]>('/api/alumni/referrals');
  },

  saveReferrals(referrals: Referral[]) {
    write(REFERRAL_KEY, referrals);
  },

  async createReferral(alumniId: string, requestData: ReferralRequest): Promise<Referral> {
    return request<Referral>(`/api/alumni/${alumniId}/referrals`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  async updateReferral(id: string, requestData: ReferralRequest): Promise<Referral> {
    return request<Referral>(`/api/alumni/referrals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  },

  async deleteReferral(id: string): Promise<void> {
    await request<void>(`/api/alumni/referrals/${id}`, {
      method: 'DELETE',
    });
  },

  async getProfile(id: string): Promise<Alumni> {
    return request<Alumni>(`/api/alumni/${id}`);
  },

  async updateProfile(id: string, requestData: AlumniProfileRequest): Promise<Alumni> {
    return request<Alumni>(`/api/alumni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  },

  async update(id: string | number, requestData: Partial<Alumni>): Promise<Alumni> {
    return request<Alumni>(`/api/alumni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  },

  async delete(id: string | number): Promise<void> {
    await request<void>(`/api/alumni/${id}`, {
      method: 'DELETE',
    });
  },
};
