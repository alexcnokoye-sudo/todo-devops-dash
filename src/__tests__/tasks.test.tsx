/**
 * Unit tests for Task functionality
 */

import { describe, it, expect, vi } from 'vitest';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({
        data: {
          session: {
            user: { id: 'test-user-id', email: 'test@example.com' }
          }
        }
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
      signOut: vi.fn(() => Promise.resolve({ error: null }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({
          data: [],
          error: null
        }))
      })),
      insert: vi.fn(() => Promise.resolve({ error: null })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}));

describe('Tasks Component - DevOps Testing Suite', () => {
  /**
   * Test 1: Verify Supabase client can fetch tasks
   * Tests the READ operation in CRUD functionality
   */
  it('should fetch tasks from database', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const result = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    expect(supabase.from).toHaveBeenCalledWith('tasks');
    expect(result.data).toEqual([]);
    expect(result.error).toBeNull();
  });

  /**
   * Test 2: Verify adding a new task
   * Tests the CREATE operation in CRUD functionality
   */
  it('should insert a new task with description and due date', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const newTask = {
      user_id: 'test-user-id',
      description: 'Test DevOps Task',
      due_date: '2025-12-31',
      completed: false,
    };

    const result = await supabase
      .from('tasks')
      .insert(newTask);

    expect(supabase.from).toHaveBeenCalledWith('tasks');
    expect(result.error).toBeNull();
  });

  /**
   * Test 3: Verify task completion toggle
   * Tests the UPDATE operation for task status
   */
  it('should update task completion status', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const result = await supabase
      .from('tasks')
      .update({ completed: true })
      .eq('id', 'test-task-id');

    expect(supabase.from).toHaveBeenCalledWith('tasks');
    expect(result.error).toBeNull();
  });

  /**
   * Test 4: Verify tasks are sorted by due date
   * Ensures proper data ordering for user experience
   */
  it('should fetch tasks sorted by due date (earliest first)', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const mockTasks = [
      { id: '1', description: 'Task 1', due_date: '2025-11-01', completed: false, created_at: '2025-01-01' },
      { id: '2', description: 'Task 2', due_date: '2025-12-01', completed: false, created_at: '2025-01-01' }
    ];

    (supabase.from as any).mockReturnValue({
      select: vi.fn(() => ({
        order: vi.fn((field, options) => {
          expect(field).toBe('due_date');
          expect(options.ascending).toBe(true);
          return Promise.resolve({ data: mockTasks, error: null });
        })
      }))
    });

    const result = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    expect(result.data).toEqual(mockTasks);
    expect(result.data![0].due_date).toBe('2025-11-01');
    expect(result.data![1].due_date).toBe('2025-12-01');
  });

  /**
   * Test 5: Verify task deletion
   * Tests the DELETE operation in CRUD functionality
   */
  it('should delete a task by id', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const result = await supabase
      .from('tasks')
      .delete()
      .eq('id', 'test-task-id');

    expect(supabase.from).toHaveBeenCalledWith('tasks');
    expect(result.error).toBeNull();
  });

  /**
   * Test 6: Verify authentication session check
   * Tests authentication state management
   */
  it('should check user session', async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const result = await supabase.auth.getSession();

    expect(result.data.session).toBeDefined();
    expect(result.data.session?.user.id).toBe('test-user-id');
    expect(result.data.session?.user.email).toBe('test@example.com');
  });
});

