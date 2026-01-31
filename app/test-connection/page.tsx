'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TestConnectionPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    setStatus('loading');
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResult(data.data);
      } else {
        setStatus('error');
        setError(data.message || 'Connection failed');
        setResult(data.details);
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to test connection');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Database Connection Test</h1>
          <p className="text-muted-foreground mt-2">
            Test your MySQL database connection
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>
              Click the button below to test your database connection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testConnection} disabled={status === 'loading'} size="lg">
              {status === 'loading' ? 'Testing...' : 'Test Connection'}
            </Button>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-green-900">✓ Connection Successful!</p>
                <div className="bg-white rounded p-3 font-mono text-sm space-y-1">
                  <p>Host: {result?.host}</p>
                  <p>Database: {result?.database}</p>
                  <p>Query: {result?.query}</p>
                  <p className="text-green-600">
                    Result: {JSON.stringify(result?.result)}
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-red-900">✗ Connection Failed</p>
                <p className="text-red-700">{error}</p>
                {result && (
                  <div className="bg-white rounded p-3 font-mono text-sm space-y-1">
                    <p>Host: {result?.host}</p>
                    <p>Database: {result?.database}</p>
                    <p>Username: {result?.username}</p>
                  </div>
                )}
                <p className="text-sm text-red-600 mt-3">
                  Make sure your .env.local file has the correct credentials and the MySQL server is running.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded font-mono text-sm space-y-1">
              <p>Loaded from .env.local:</p>
              <p>• DB_HOST: 127.0.0.1</p>
              <p>• DB_PORT: 3306</p>
              <p>• DB_DATABASE: fgwhole</p>
              <p>• DB_USERNAME: root</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
